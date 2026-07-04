import React, { useState, useRef, useCallback } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { flushSync } from 'react-dom';
import { Download, Eye, Loader2, FileBadge, RefreshCw,
  ChevronDown, ChevronUp, User, Hash, Users,
  Calendar, FileText, Award, Edit3
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { apiClient as api } from '../api/client';

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
  signer3Title: string;
  signer3Subtitle: string;
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
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Icon className="w-4 h-4 text-blue-600" />{title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-4 py-4 space-y-4 bg-white">{children}</div>}
    </div>
  );
}

/* ── Field helpers ── */
type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const Field = ({ label, name, value, onChange, placeholder = '' }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvt) => void; placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <input
      name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, rows = 3 }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvt) => void; rows?: number;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <textarea
      name={name} value={value} rows={rows}
      onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
    />
    <p className="text-xs text-gray-400 mt-1">
      Use <code className="bg-gray-100 px-1 rounded">{'{gender}'}</code> as placeholder for his / her / their
    </p>
  </div>
);

/* ────────────────────────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────────────────────────── */
const AdminCertificates = () => {
  const [data, setData] = useState<CertData>(DEFAULT);
  const [isGenerating, setIsGenerating] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

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
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl"><FileBadge className="w-7 h-7 text-blue-600" /></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Certificate Generator</h1>
              <p className="text-xs text-gray-500">Issue official IIIT Bhagalpur Certificates of Appreciation</p>
            </div>
          </div>
          <div className="flex gap-2">
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
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* Left: Controls */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-3 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 180px)' }}>

            <Section title="Recipient Details" icon={User}>
              <Field label="Full Name *" name="name" value={data.name} onChange={handle} placeholder="e.g. Aditya Kumar Jha" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Roll Number *" name="rollNo" value={data.rollNo} onChange={handle} placeholder="240101150" />
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Gender Pronoun</label>
                  <select name="gender" value={data.gender} onChange={handle}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white">
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

            <Section title="Signatory 1" icon={Award} defaultOpen={false}>
              <Field label="Name" name="signer1Name" value={data.signer1Name} onChange={handle} />
              <Field label="Title" name="signer1Title" value={data.signer1Title} onChange={handle} />
              <Field label="Subtitle" name="signer1Subtitle" value={data.signer1Subtitle} onChange={handle} />
            </Section>
            <Section title="Signatory 2" icon={Award} defaultOpen={false}>
              <Field label="Name" name="signer2Name" value={data.signer2Name} onChange={handle} />
              <Field label="Title" name="signer2Title" value={data.signer2Title} onChange={handle} />
              <Field label="Subtitle" name="signer2Subtitle" value={data.signer2Subtitle} onChange={handle} />
            </Section>
            <Section title="Signatory 3" icon={Award} defaultOpen={false}>
              <Field label="Name" name="signer3Name" value={data.signer3Name} onChange={handle} />
              <Field label="Title" name="signer3Title" value={data.signer3Title} onChange={handle} />
              <Field label="Subtitle" name="signer3Subtitle" value={data.signer3Subtitle} onChange={handle} />
            </Section>

          </div>

          {/* Right: Live Preview */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-w-0">
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
      </div>
    </AdminLayout>
  );
};

export default AdminCertificates;
