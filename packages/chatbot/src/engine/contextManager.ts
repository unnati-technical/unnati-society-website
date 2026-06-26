export class ContextManager {
  private static instance: ContextManager;
  private state: {
    language: string;
    activeProgram: string | null;
    activeForm: string | null;
    formStep: number;
    history: string[];
    userProfile: {
      city: string | null;
      profession: string | null;
      availability: string | null;
      skills: string | null;
      name: string | null;
      phone: string | null;
      email: string | null;
    };
    formBuffer: any; // Used to store current form progress
  };

  private constructor() {
    this.state = {
      language: 'en',
      activeProgram: null,
      activeForm: null,
      formStep: 0,
      history: [],
      userProfile: {
        city: null,
        profession: null,
        availability: null,
        skills: null,
        name: null,
        phone: null,
        email: null
      },
      formBuffer: {}
    };
  }

  public static getInstance(): ContextManager {
    if (!ContextManager.instance) {
      ContextManager.instance = new ContextManager();
    }
    return ContextManager.instance;
  }

  public setLanguage(lang: string) { this.state.language = lang; }
  public getLanguage() { return this.state.language; }
  
  public setActiveProgram(program: string) { this.state.activeProgram = program; }
  public getActiveProgram() { return this.state.activeProgram; }

  public startForm(formName: string) {
    this.state.activeForm = formName;
    this.state.formStep = 0;
    this.state.formBuffer = {};
  }
  public getActiveForm() { return this.state.activeForm; }
  public advanceForm() { return ++this.state.formStep; }
  public clearForm() {
    this.state.activeForm = null;
    this.state.formStep = 0;
    this.state.formBuffer = {};
  }
  public getFormStep() { return this.state.formStep; }

  public getFormBuffer() { return this.state.formBuffer; }
  public updateFormBuffer(key: string, value: any) { this.state.formBuffer[key] = value; }

  public logIntent(intent: string) {
    this.state.history.push(intent);
    if (this.state.history.length > 10) this.state.history.shift();
  }
  public getHistory() { return this.state.history; }

  public updateUserProfile(key: keyof typeof this.state.userProfile, value: string) {
    this.state.userProfile[key] = value;
  }
  public getUserProfile() { return this.state.userProfile; }
}
