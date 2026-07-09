import React, { useState, useRef, useCallback } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { flushSync } from 'react-dom';
import { Download, Eye, Loader2, FileBadge, RefreshCw,
  ChevronDown, ChevronUp, User, Hash, Users,
  Calendar, FileText, Award, Edit3, Trash2, Check, X
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { apiClient as api } from '../api/client';
import * as XLSX from 'xlsx';

/* ────────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────────── */
interface CertData {
  id?: string;
  referenceNo: string;
  name: string;
  rollNo: string;
  team: string;
  batch: string;
  gender: 'his' | 'her' | 'their';
  appreciationType: string;
  bodyText: string;
  signer1Name: string;
  signer1Title: string;
  signer1Subtitle: string;
  signer2Name: string;
  signer2Title: string;
  signer2Subtitle: string;
  signer3Name: string;
  signer3Name: string;
  signer3Title: string;
  signer3Subtitle: string;
}

interface CertificateRecord {
  id: string;
  referenceNo: string;
  recipientName: string;
  rollNo: string | null;
  team: string | null;
  batch: string | null;
  appreciationType: string;
  issuedAt: string;
}

const DEFAULT: CertData = {
  referenceNo: 'DOAIR/2026/Unnati/Volu/061',
  name: '',
  rollNo: '',
  team: 'Volunteer',
  batch: '2024\u201328',
  gender: 'his',
  appreciationType: 'OF APPRECIATION',
  bodyText: 'in recognition of {gender} sincere dedication and valuable contribution to spreading digital literacy and foundational education through Unnati Society under the Institutional Outreach Activity.',
  signer1Name: 'DR. CHETAN BARDE',
  signer1Title: 'FACULTY MENTOR',
  signer1Subtitle: 'UNNATI SOCIETY',
  signer2Name: 'DR. DHEERAJ KUMAR SINHA',
  signer2Title: 'ASSOCIATE DEAN',
  signer2Subtitle: 'STUDENT WELFARE',
  signer3Name: 'DR. PRAKASH RANJAN',
  signer3Title: 'ASSOCIATE DEAN',
  signer3Subtitle: 'ALUMI AND INSTITUTIONAL RELATIONS',
};

/* ────────────────────────────────────────────────────────────────
   SIGNATURE BLOCK
   • Container is fully transparent — no white box
   • img uses mix-blend-mode: multiply  →  white pixels vanish,
     ink stays dark against any coloured background
──────────────────────────────────────────────────────────────── */
interface SigBlockProps {
  imgSrc: string;
  name: string;
  title: string;
  subtitle: string;
  /** px from left edge of the 1122-wide canvas */
  left: number;
  /** px from bottom edge of the 794-high canvas */
  bottom: number;
  imgW: number;
  imgH: number;
}

const SigBlock = ({ imgSrc, name, title, subtitle, left, bottom, imgW }: SigBlockProps) => (
  <div
    style={{
      position: 'absolute',
      bottom: `${bottom}px`,
      left: `${left}px`,
      width: '235px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: 'transparent',   // ← no white box
      zIndex: 3,
      mixBlendMode: 'multiply',    // ← fixes stacking context, makes image white bg transparent
    }}
  >
    {/* Signature image */}
    <img
      src={imgSrc}
      alt="signature"
      crossOrigin="anonymous"
      style={{
        width: `${imgW}px`,
        height: 'auto',             // ← prevents any distortion
        filter: 'contrast(1.2)',    // keep ink crisp
        display: 'block',
        marginBottom: '4px',
      }}
    />
    {/* Divider */}
    <div style={{ borderTop: '1.5px solid #0b1a34', width: '100%', marginBottom: '6px' }} />
    {/* Labels */}
    <div style={{ fontSize: '11px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', letterSpacing: '0.03em', lineHeight: '16px' }}>
      {name}
    </div>
    <div style={{ fontSize: '10.5px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', lineHeight: '15px' }}>
      {title}
    </div>
    {subtitle && (
      <div style={{ fontSize: '10.5px', fontFamily: 'Arial,sans-serif', fontWeight: 700, color: '#0b1a34', lineHeight: '15px' }}>
        {subtitle}
      </div>
    )}
  </div>
);

/* ────────────────────────────────────────────────────────────────
   CERTIFICATE CANVAS
   Fixed 1122 × 794 px — matches A4 Landscape at 96 dpi.
   All positions pixel-matched to reference.png.
──────────────────────────────────────────────────────────────── */
const CertificateCanvas = React.forwardRef<HTMLDivElement, { data: CertData }>(({ data }, ref) => {
  const body = data.bodyText.replace('{gender}', data.gender);

  return (
    <div
      ref={ref}
      style={{
        width: '1122px',
        height: '794px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Background template (clean blank) */}
      <img 
        src="https://res.cloudinary.com/drhkvdtw2/image/upload/v1783182561/certificates/wsiz3egpixlklxo3fni0.png" 
        alt="Certificate Template" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        crossOrigin="anonymous"
      />

      {/* ── Reference Number ──────────────────────────────────────
          Reference image: top-right corner inside frame ~top:68, right:65  */}
      <div style={{
        position: 'absolute',
        top: '80px',
        right: '75px',
        fontSize: '12.5px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 700,
        color: '#0b1a34',
        letterSpacing: '0.04em',
        zIndex: 3,
      }}>
        {data.referenceNo}
      </div>

      {/* ── "OF APPRECIATION" ─────────────────────────────────────
          Reference: y≈340, centered, letter-spaced, bold, navy    */}
      <div style={{
        position: 'absolute',
        top: '340px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '21px',
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        fontWeight: 700,
        letterSpacing: '5px',
        color: '#0b1a34',
        zIndex: 3,
      }}>
        {data.appreciationType}
      </div>

      {/* ── Body paragraph ────────────────────────────────────────
          Reference: starts y≈378, margins ~62px L/R, centered     */}
      <div style={{
        position: 'absolute',
        top: '378px',
        left: '62px',
        right: '62px',
        textAlign: 'center',
        fontSize: '17.5px',
        lineHeight: '30px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#0b1a34',
        zIndex: 3,
      }}>
        {'This certificate is awarded to '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.name || 'Recipient Name'}
        </span>
        {'(Roll No. '}
        <span style={{ fontWeight: 600 }}>{data.rollNo || 'XXXXXXXXX'}</span>
        {') of the '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.team}
        </span>
        {' Team, Batch of '}
        <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {data.batch}
        </span>
        {', '}
        {body}
      </div>

      {/* ── Signature Blocks ──────────────────────────────────────
          Reference positions (bottom measured from canvas bottom):
            Sig1: left≈66,  bottom≈118
            Sig2: left≈415, bottom≈118
            Sig3: left≈790, bottom≈118                              */}
      <SigBlock
        imgSrc="https://res.cloudinary.com/drhkvdtw2/image/upload/e_make_transparent:20/v1783182562/certificates/fyqmzwit6gejnpyw0tgo.png"
        name={data.signer1Name}
        title={data.signer1Title}
        subtitle={data.signer1Subtitle}
        left={60}
        bottom={118}
        imgW={145}
        imgH={0}
      />
      <SigBlock
        imgSrc="https://res.cloudinary.com/drhkvdtw2/image/upload/e_make_transparent:20/v1783182563/certificates/ivkkvujsef8yhtkawmvl.png"
        name={data.signer2Name}
        title={data.signer2Title}
        subtitle={data.signer2Subtitle}
        left={430}
        bottom={118}
        imgW={135}
        imgH={0}
      />
      <SigBlock
        imgSrc="https://res.cloudinary.com/drhkvdtw2/image/upload/e_make_transparent:20/v1783182564/certificates/rsnjl2kjyzjj15iahumn.png"
        name={data.signer3Name}
        title={data.signer3Title}
        subtitle={data.signer3Subtitle}
        left={810}
        bottom={118}
        imgW={115}
        imgH={0}
      />



      {/* ── Clickable Text for Verification ─────────────────────── */}
      {data.id && (
        <div style={{
          position: 'absolute',
          bottom: '25px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 700,
          color: '#3b82f6', // blue-500
          textDecoration: 'underline',
          fontFamily: 'Arial, sans-serif',
          zIndex: 3,
          opacity: 0.9,
        }}>
          Click here to verify this certificate's authenticity online.
        </div>
      )}
    </div>
  );
});
CertificateCanvas.displayName = 'CertificateCanvas';

/* ────────────────────────────────────────────────────────────────
   Auto-scaling preview wrapper
──────────────────────────────────────────────────────────────── */
function PreviewScaler({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.55);

  React.useLayoutEffect(() => {
    const el = wrapRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min((width - 32) / 1122, (height - 32) / 794, 1));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ transform: `scale(${scale})`, transformOrigin: 'center center', display: 'inline-block', lineHeight: 0 }}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Collapsible section
──────────────────────────────────────────────────────────────── */
function Section({ title, icon: Icon, children, defaultOpen = true }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden transition-all duration-200 hover:border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50/50 transition-colors group"
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-gray-800">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Icon className="w-4.5 h-4.5" />
          </div>
          {title}
        </span>
        <div className={`p-1 rounded-md transition-colors ${open ? 'bg-gray-100' : 'bg-transparent group-hover:bg-gray-100'}`}>
          {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out origin-top ${open ? 'max-h-[1000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}>
        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-gray-50">{children}</div>
      </div>
    </div>
  );
}

/* ── Field helpers ── */
type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const Field = ({ label, name, value, onChange, placeholder = '' }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvt) => void; placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
    <input
      name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50 focus:bg-white"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, rows = 3 }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvt) => void; rows?: number;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
    <textarea
      name={name} value={value} rows={rows}
      onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none placeholder:text-gray-400 bg-gray-50/50 focus:bg-white"
    />
    <p className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400"></span>
      Use <code className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 font-mono text-[10px]">{"{gender}"}</code> for his / her / their
    </p>
  </div>
);

/* ────────────────────────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────────────────────────── */
const AdminCertificates = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [history, setHistory] = useState<CertificateRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CertificateRecord>>({});

  const [data, setData] = useState<CertData>(DEFAULT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await api.get('/api/certificates');
      setHistory(Array.isArray(res) ? res : (res.data || []));
      setSelected([]);
    } catch (error) {
      toast.error('Failed to load certificates history');
    } finally {
      setLoadingHistory(false);
    }
  };

  // Fetch History
  React.useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  const toggleSelectAll = () => {
    if (selected.length === history.length) {
      setSelected([]);
    } else {
      setSelected(history.map(h => h.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.post(`/api/certificates/${id}/delete`);
      toast.success('Certificate deleted');
      fetchHistory();
    } catch (error) {
      toast.error('Failed to delete certificate');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selected.length} certificates?`)) return;
    try {
      await api.post('/api/certificates/bulk-delete', { ids: selected });
      toast.success('Certificates deleted');
      fetchHistory();
    } catch (error) {
      toast.error('Failed to delete certificates');
    }
  };

  const startEdit = (cert: CertificateRecord) => {
    setEditingId(cert.id);
    setEditForm(cert);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await api.post(`/api/certificates/${editingId}`, editForm);
      toast.success('Certificate updated');
      setEditingId(null);
      fetchHistory();
    } catch (error) {
      toast.error('Failed to update certificate');
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsBulkUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      if (jsonData.length === 0) {
        toast.error('The Excel sheet is empty.');
        return;
      }

      // Map headers to backend payload
      const payload = jsonData.map(row => ({
        referenceNo: row['Reference Number'],
        recipientName: row['Full Name'],
        rollNo: row['Roll Number'],
        team: row['Team'] || 'Volunteer',
        batch: row['Batch'] || '2024-28',
        gender: row['Gender'] || 'his',
        appreciationType: row['Appreciation Type'] || 'OF APPRECIATION',
        bodyText: row['Body Text'] || 'in recognition of {gender} sincere dedication and valuable contribution to spreading digital literacy and foundational education through Unnati Society under the Institutional Outreach Activity.',
      }));

      // Filter out rows missing required fields
      const validPayload = payload.filter(p => p.referenceNo && p.recipientName);

      if (validPayload.length === 0) {
        toast.error('No valid rows found. Please ensure "Reference Number" and "Full Name" columns exist.');
        return;
      }

      toast.info(`Processing ${validPayload.length} certificates...`);

      // Call API
      await api.post('/api/certificates/bulk', validPayload);
      
      // Update the original JSON data with links
      const updatedJsonData = jsonData.map(row => {
        const ref = row['Reference Number'];
        if (ref) {
          return {
            ...row,
            'Verification Link': `https://unnati.ir/verify/${ref}`
          };
        }
        return row;
      });

      // Create new workbook and download
      const newWorksheet = XLSX.utils.json_to_sheet(updatedJsonData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Certificates');
      XLSX.writeFile(newWorkbook, `Certificates_Links_${new Date().getTime()}.xlsx`);

      toast.success('Bulk upload successful! Excel file downloaded.');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to process bulk upload.');
    } finally {
      setIsBulkUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [{
      'Reference Number': 'DOAIR/2026/Unnati/Volu/001',
      'Full Name': 'Aditya Kumar Jha',
      'Roll Number': '240101150',
      'Team': 'Volunteer',
      'Batch': '2024-28',
      'Gender': 'his',
      'Appreciation Type': 'OF APPRECIATION',
      'Body Text': 'in recognition of {gender} sincere dedication and valuable contribution to spreading digital literacy and foundational education through Unnati Society under the Institutional Outreach Activity.'
    }];
    
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'Unnati_Bulk_Certificate_Template.xlsx');
  };

  const handle = useCallback((e: ChangeEvt) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleDownload = async () => {
    if (!data.name.trim() || !data.rollNo.trim()) {
      toast.error('Please enter the recipient name and roll number.');
      return;
    }
    if (!captureRef.current) return;
    setIsGenerating(true);
    try {
      // 1. Generate ID in the database
      const res = await api.post('/api/certificates', {
        referenceNo: data.referenceNo,
        recipientName: data.name,
        rollNo: data.rollNo,
        team: data.team,
        batch: data.batch,
        appreciationType: data.appreciationType,
        bodyText: data.bodyText,
      });

      // 2. Update state to render the QR Code synchronously
      flushSync(() => {
        setData(prev => ({ ...prev, id: res.id }));
      });

      // 3. Wait a tiny bit for the QR code to actually render onto the DOM
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
        imageTimeout: 30000,
        width: 1122,
        height: 794,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, w, h);
      
        // Make the text at the bottom clickable in the exported PDF
      if (res.referenceNo) {
        // y is roughly 200mm on A4 landscape (210mm height). We cover the whole width at the bottom.
        pdf.link(0, 195, 297, 15, { url: `https://unnati.ir/verify/${res.referenceNo}` });
      }

      pdf.save(`${data.name.replace(/\s+/g, '_')}_Certificate.pdf`);
      toast.success('Certificate PDF generated and downloaded!');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to generate PDF. Make sure the reference number is unique.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AdminLayout>
      {/* Hidden full-res capture canvas */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', zIndex: -1, pointerEvents: 'none' }}>
        <CertificateCanvas ref={captureRef} data={data} />
      </div>

      <div className="flex flex-col h-full gap-4 max-w-[1700px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl"><FileBadge className="w-7 h-7 text-blue-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Certificates</h1>
              <div className="flex items-center gap-4 mt-1">
                <button
                  onClick={() => setActiveTab('generator')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'generator' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Generator
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {activeTab === 'generator' && (
              <>
                <button 
                  onClick={handleDownloadTemplate} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Download className="w-4 h-4" /> Template
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleBulkUpload} 
                  accept=".xlsx,.xls,.csv" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  disabled={isBulkUploading || isGenerating}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isBulkUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} Bulk Upload
                </button>
                <button onClick={() => setData(DEFAULT)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isGenerating
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                    : <><Download className="w-4 h-4" /> Download PDF</>}
                </button>
              </>
            )}
            {activeTab === 'history' && selected.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected ({selected.length})
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        {activeTab === 'generator' ? (
        <div className="flex flex-col xl:flex-row gap-4 flex-1 min-h-0">

          {/* Left: Controls */}
          <div className="w-full xl:w-[360px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 pb-6 xl:max-h-[calc(100vh-180px)] xl:pb-2">

            <Section title="Recipient Details" icon={User}>
              <Field label="Full Name *" name="name" value={data.name} onChange={handle} placeholder="e.g. Aditya Kumar Jha" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Roll Number *" name="rollNo" value={data.rollNo} onChange={handle} placeholder="240101150" />
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gender Pronoun</label>
                  <select name="gender" value={data.gender} onChange={handle}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50/50 focus:bg-white cursor-pointer">
                    <option value="his">his (male)</option>
                    <option value="her">her (female)</option>
                    <option value="their">their (other)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Team" name="team" value={data.team} onChange={handle} />
                <Field label="Batch" name="batch" value={data.batch} onChange={handle} />
              </div>
            </Section>

            <Section title="Certificate Text" icon={Edit3}>
              <Field label="Reference Number" name="referenceNo" value={data.referenceNo} onChange={handle} />
              <Field label="Certificate Subtitle" name="appreciationType" value={data.appreciationType} onChange={handle} />
              <TextareaField label="Body Text" name="bodyText" value={data.bodyText} onChange={handle} rows={4} />
            </Section>


          </div>

          {/* Right: Live Preview */}
          <div className="flex-1 min-h-[500px] xl:min-h-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-w-0">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-700 flex-shrink-0">
              <Eye className="w-4 h-4 text-blue-500" />
              Live Preview
              <span className="ml-auto text-xs text-gray-400 font-normal">Exact PDF output</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 overflow-hidden">
              <PreviewScaler>
                <CertificateCanvas data={data} />
              </PreviewScaler>
            </div>
          </div>

        </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider w-10">
                      <input type="checkbox" checked={selected.length === history.length && history.length > 0} onChange={toggleSelectAll} className="rounded border-gray-300" />
                    </th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Recipient Name</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Reference No</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Roll No</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Team</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loadingHistory ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                        Loading certificates...
                      </td>
                    </tr>
                  ) : history.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No certificates have been issued yet.
                      </td>
                    </tr>
                  ) : (
                    history.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <input type="checkbox" checked={selected.includes(cert.id)} onChange={() => toggleSelect(cert.id)} className="rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {editingId === cert.id ? (
                            <input type="text" value={editForm.recipientName || ''} onChange={e => setEditForm({...editForm, recipientName: e.target.value})} className="border rounded px-2 py-1 w-full" />
                          ) : cert.recipientName}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                          {editingId === cert.id ? (
                            <input type="text" value={editForm.referenceNo || ''} onChange={e => setEditForm({...editForm, referenceNo: e.target.value})} className="border rounded px-2 py-1 w-full" />
                          ) : cert.referenceNo}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {editingId === cert.id ? (
                            <input type="text" value={editForm.rollNo || ''} onChange={e => setEditForm({...editForm, rollNo: e.target.value})} className="border rounded px-2 py-1 w-full max-w-[100px]" />
                          ) : cert.rollNo || '-'}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {editingId === cert.id ? (
                            <input type="text" value={editForm.team || ''} onChange={e => setEditForm({...editForm, team: e.target.value})} className="border rounded px-2 py-1 w-full max-w-[120px]" />
                          ) : cert.team || '-'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editingId === cert.id ? (
                            <div className="flex justify-end gap-2">
                              <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><Check className="w-4 h-4"/></button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
                            </div>
                          ) : (
                            <div className="flex justify-end items-center gap-2">
                              <a 
                                href={`https://unnati.ir/verify/${cert.referenceNo}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" /> View
                              </a>
                              <button onClick={() => startEdit(cert)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(cert.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCertificates;
