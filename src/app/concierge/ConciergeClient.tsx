'use client';

import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import Link from 'next/link';
import { saveCustomerProfile } from './actions';

// ── Types ────────────────────────────────────────────────────────────────────

type HomeStyle = 'minimalistlik' | 'hubane' | 'julge' | 'eklektiline';
type ColourPref = 'soojad' | 'jahedad' | 'neutraalsed' | 'segatud';
type DeliveryFreq = 'iganädalane' | 'kahenädalane' | 'igakuine';
type Occasion = { person: string; occasion: string; date: string };

type WizardData = {
  name: string;
  email: string;
  homeStyle: HomeStyle | '';
  colourPref: ColourPref | '';
  occasions: Occasion[];
  deliveryFreq: DeliveryFreq | '';
};

type SetData = Dispatch<SetStateAction<WizardData>>;

// ── Data ─────────────────────────────────────────────────────────────────────

const HOME_STYLES: Array<{
  id: HomeStyle;
  label: string;
  desc: string;
  icon: string;
  from: string;
  to: string;
  dark?: boolean;
}> = [
  {
    id: 'minimalistlik',
    label: 'Minimalistlik',
    desc: 'Puhas, rahulik, aeglane ilu',
    icon: '◯',
    from: 'from-gray-50',
    to: 'to-slate-100',
  },
  {
    id: 'hubane',
    label: 'Hubane',
    desc: 'Soe, pehme, kodune tunne',
    icon: '🕯',
    from: 'from-amber-50',
    to: 'to-orange-50',
  },
  {
    id: 'julge',
    label: 'Julge',
    desc: 'Dramaatiline, ere, moodne',
    icon: '✦',
    from: 'from-gray-800',
    to: 'to-gray-900',
    dark: true,
  },
  {
    id: 'eklektiline',
    label: 'Eklektiline',
    desc: 'Mänguline, värviline, unikaalne',
    icon: '✿',
    from: 'from-pink-50',
    to: 'to-violet-50',
  },
];

const COLOUR_PREFS: Array<{
  id: ColourPref;
  label: string;
  desc: string;
  swatches: string[];
}> = [
  {
    id: 'soojad',
    label: 'Soojad',
    desc: 'Punased, oranžid, roosad',
    swatches: ['#E8195A', '#FF6B35', '#FFB347', '#FF8C94'],
  },
  {
    id: 'jahedad',
    label: 'Jahedad',
    desc: 'Sinised, lillad, valged',
    swatches: ['#5B8CFF', '#A78BFA', '#C4B5FD', '#93C5FD'],
  },
  {
    id: 'neutraalsed',
    label: 'Neutraalsed',
    desc: 'Kreemid, rohelised, beežid',
    swatches: ['#D4C5A9', '#B5C4B1', '#E8E4DC', '#C9C9A7'],
  },
  {
    id: 'segatud',
    label: 'Segatud',
    desc: 'Kõik värvid harmoonias',
    swatches: ['#E8195A', '#5B8CFF', '#B5C4B1', '#FFB347'],
  },
];

const DELIVERY_FREQS: Array<{
  id: DeliveryFreq;
  label: string;
  sublabel: string;
  desc: string;
}> = [
  {
    id: 'iganädalane',
    label: 'Iganädalane',
    sublabel: 'Iga nädal',
    desc: 'Alati värsked lilled kodus',
  },
  {
    id: 'kahenädalane',
    label: 'Üle nädala',
    sublabel: 'Iga 2 nädala tagant',
    desc: 'Ideaalne tasakaal',
  },
  {
    id: 'igakuine',
    label: 'Igakuine',
    sublabel: 'Kord kuus',
    desc: 'Kuuühine lilleelammus',
  },
];

const TOTAL_STEPS = 5;

// ── Shared icon ──────────────────────────────────────────────────────────────

function Check() {
  return (
    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ── Main wizard ──────────────────────────────────────────────────────────────

export default function ConciergeClient() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addingOcc, setAddingOcc] = useState(false);
  const [newOcc, setNewOcc] = useState<Occasion>({ person: '', occasion: '', date: '' });

  const [data, setData] = useState<WizardData>({
    name: '',
    email: '',
    homeStyle: '',
    colourPref: '',
    occasions: [],
    deliveryFreq: '',
  });

  const transition = (fn: () => void) => {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
    }, 220);
  };

  const goBack = () => {
    if (addingOcc) setAddingOcc(false);
    transition(() => setStep((s) => s - 1));
  };

  const canProceed = () => {
    if (step === 1) return data.name.trim().length > 0 && data.email.includes('@');
    if (step === 2) return !!data.homeStyle;
    if (step === 3) return !!data.colourPref;
    if (step === 4) return true;
    if (step === 5) return !!data.deliveryFreq;
    return false;
  };

  const handleNext = async () => {
    if (step === 1) {
      const emailOk = data.email.includes('@') && data.email.includes('.');
      if (!emailOk) {
        setEmailError('Palun sisesta korrektne e-posti aadress');
        return;
      }
      setEmailError('');
    }

    if (step < TOTAL_STEPS) {
      transition(() => setStep((s) => s + 1));
      return;
    }

    setLoading(true);
    setSubmitError('');
    try {
      await saveCustomerProfile({
        name: data.name,
        email: data.email,
        homeStyle: data.homeStyle,
        colourPref: data.colourPref,
        occasions: data.occasions,
        deliveryFreq: data.deliveryFreq,
      });
      transition(() => setDone(true));
    } catch {
      setSubmitError('Midagi läks valesti. Palun proovi uuesti.');
    } finally {
      setLoading(false);
    }
  };

  const addOccasion = () => {
    if (!newOcc.person || !newOcc.occasion || !newOcc.date) return;
    setData((d) => ({ ...d, occasions: [...d.occasions, newOcc] }));
    setNewOcc({ person: '', occasion: '', date: '' });
    setAddingOcc(false);
  };

  const removeOccasion = (i: number) => {
    setData((d) => ({ ...d, occasions: d.occasions.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-white">
      {/* Thin progress bar */}
      {!done && (
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-[#E8195A] transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      )}

      {/* Animated content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {done ? (
          <ConfirmationScreen data={data} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
            <div className="w-full max-w-xl">
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#E8195A] uppercase">
                  Samm {step} / {TOTAL_STEPS}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i + 1 <= step ? 'bg-[#E8195A] w-6' : 'bg-gray-200 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step content */}
              {step === 1 && (
                <Step1 data={data} setData={setData} emailError={emailError} />
              )}
              {step === 2 && <Step2 data={data} setData={setData} />}
              {step === 3 && <Step3 data={data} setData={setData} />}
              {step === 4 && (
                <Step4
                  data={data}
                  addingOcc={addingOcc}
                  setAddingOcc={setAddingOcc}
                  newOcc={newOcc}
                  onChangeOcc={(field, val) => setNewOcc((o) => ({ ...o, [field]: val }))}
                  addOccasion={addOccasion}
                  removeOccasion={removeOccasion}
                />
              )}
              {step === 5 && <Step5 data={data} setData={setData} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12">
                {step > 1 ? (
                  <button
                    onClick={goBack}
                    className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                  >
                    ← Tagasi
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || loading}
                  className={`px-8 py-3.5 rounded-full font-semibold text-sm transition-all ${
                    !canProceed() || loading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#E8195A] text-white hover:bg-[#c9144a] hover:scale-105 active:scale-100'
                  }`}
                >
                  {loading
                    ? 'Salvestamine...'
                    : step === TOTAL_STEPS
                    ? 'Lõpeta'
                    : 'Edasi →'}
                </button>
              </div>

              {submitError && (
                <p className="text-red-400 text-sm mt-3 text-right">{submitError}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 1: Name & email ─────────────────────────────────────────────────────

function Step1({
  data,
  setData,
  emailError,
}: {
  data: WizardData;
  setData: SetData;
  emailError: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-5">
        Tutvumine
      </p>
      <h1
        className="text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
      >
        Tere! Olen su<br />
        <span className="text-[#E8195A]">lillenõustaja.</span>
      </h1>
      <p className="text-gray-400 mb-10 text-base leading-relaxed">
        Aitame sul leida täpselt sobivad lilled. Alustame tutvumisest.
      </p>

      <div className="space-y-7">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Sinu nimi
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            placeholder="Mis on su nimi?"
            autoFocus
            className="w-full border-0 border-b-2 border-gray-200 focus:border-[#E8195A] outline-none py-3 text-xl text-gray-900 bg-transparent transition-colors placeholder:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            E-posti aadress
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
            placeholder="sina@näide.ee"
            className="w-full border-0 border-b-2 border-gray-200 focus:border-[#E8195A] outline-none py-3 text-xl text-gray-900 bg-transparent transition-colors placeholder:text-gray-200"
          />
          {emailError && (
            <p className="text-red-400 text-xs mt-2">{emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Home style ───────────────────────────────────────────────────────

function Step2({ data, setData }: { data: WizardData; setData: SetData }) {
  const firstName = data.name.split(' ')[0];
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-5">
        Kodu stiil
      </p>
      <h2
        className="text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
      >
        Millisele stiilile<br />
        <span className="text-[#E8195A]">sarnaneb su kodu?</span>
      </h2>
      <p className="text-gray-400 mb-8 text-base">
        Valime sulle lilled, mis sobivad su eluruumiga täiuslikult, {firstName}.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {HOME_STYLES.map((style) => {
          const sel = data.homeStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setData((d) => ({ ...d, homeStyle: style.id }))}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all bg-gradient-to-br ${style.from} ${style.to} ${
                sel
                  ? 'border-[#E8195A] shadow-[0_4px_24px_rgba(232,25,90,0.18)]'
                  : 'border-transparent shadow-sm hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <div
                className={`text-2xl mb-3 ${
                  style.dark ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {style.icon}
              </div>
              <div
                className={`font-semibold text-sm mb-1 ${
                  style.dark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {style.label}
              </div>
              <div
                className={`text-xs leading-relaxed ${
                  style.dark ? 'text-white/55' : 'text-gray-400'
                }`}
              >
                {style.desc}
              </div>
              {sel && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-[#E8195A] rounded-full flex items-center justify-center">
                  <Check />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 3: Colour preferences ───────────────────────────────────────────────

function Step3({ data, setData }: { data: WizardData; setData: SetData }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-5">
        Värvieelistused
      </p>
      <h2
        className="text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
      >
        Millised värvid<br />
        <span className="text-[#E8195A]">rõõmustavad sind?</span>
      </h2>
      <p className="text-gray-400 mb-8 text-base">
        Koostame kimbu sinu värvimaailma arvestades.
      </p>

      <div className="space-y-3">
        {COLOUR_PREFS.map((c) => {
          const sel = data.colourPref === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setData((d) => ({ ...d, colourPref: c.id }))}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                sel
                  ? 'border-[#E8195A] bg-[#FFF0F5] shadow-[0_4px_20px_rgba(232,25,90,0.10)]'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex gap-1.5 shrink-0">
                {c.swatches.map((hex, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{c.label}</div>
                <div className="text-gray-400 text-xs">{c.desc}</div>
              </div>
              {sel && (
                <div className="ml-auto w-5 h-5 bg-[#E8195A] rounded-full flex items-center justify-center shrink-0">
                  <Check />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 4: Occasions ────────────────────────────────────────────────────────

function Step4({
  data,
  addingOcc,
  setAddingOcc,
  newOcc,
  onChangeOcc,
  addOccasion,
  removeOccasion,
}: {
  data: WizardData;
  addingOcc: boolean;
  setAddingOcc: (v: boolean) => void;
  newOcc: Occasion;
  onChangeOcc: (field: keyof Occasion, val: string) => void;
  addOccasion: () => void;
  removeOccasion: (i: number) => void;
}) {
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('et-EE', {
        day: 'numeric',
        month: 'long',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-5">
        Tähtpäevad
      </p>
      <h2
        className="text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
      >
        Erilised kuupäevad,<br />
        <span className="text-[#E8195A]">mida meeles pidada?</span>
      </h2>
      <p className="text-gray-400 mb-8 text-base">
        Saadame sulle meeldetuletuse enne iga tähtpäeva.{' '}
        <span className="text-gray-300">Valikuline.</span>
      </p>

      {data.occasions.length > 0 && (
        <div className="space-y-2 mb-4">
          {data.occasions.map((occ, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#FFF0F5] border border-[#E8195A]/15 rounded-xl px-4 py-3"
            >
              <div className="text-sm">
                <span className="font-semibold text-gray-900">{occ.person}</span>
                <span className="text-gray-400"> — {occ.occasion}</span>
                <span className="text-gray-300 text-xs ml-2">{formatDate(occ.date)}</span>
              </div>
              <button
                onClick={() => removeOccasion(i)}
                aria-label="Eemalda"
                className="text-gray-300 hover:text-[#E8195A] transition-colors text-xl leading-none ml-3"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {addingOcc ? (
        <div className="bg-[#FFF8FA] border border-[#E8195A]/20 rounded-2xl p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Kelle tähtpäev?
            </label>
            <input
              type="text"
              value={newOcc.person}
              onChange={(e) => onChangeOcc('person', e.target.value)}
              placeholder="nt. Ema, Jaan, Liisa…"
              autoFocus
              className="w-full border-0 border-b-2 border-gray-200 focus:border-[#E8195A] outline-none py-2 text-sm bg-transparent transition-colors placeholder:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Millisel puhul?
            </label>
            <input
              type="text"
              value={newOcc.occasion}
              onChange={(e) => onChangeOcc('occasion', e.target.value)}
              placeholder="nt. Sünnipäev, Aastapäev…"
              className="w-full border-0 border-b-2 border-gray-200 focus:border-[#E8195A] outline-none py-2 text-sm bg-transparent transition-colors placeholder:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Kuupäev
            </label>
            <input
              type="date"
              value={newOcc.date}
              onChange={(e) => onChangeOcc('date', e.target.value)}
              className="w-full border-0 border-b-2 border-gray-200 focus:border-[#E8195A] outline-none py-2 text-sm bg-transparent transition-colors text-gray-700"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={addOccasion}
              disabled={!newOcc.person || !newOcc.occasion || !newOcc.date}
              className="bg-[#E8195A] text-white text-xs font-semibold px-5 py-2 rounded-full disabled:bg-gray-100 disabled:text-gray-300 transition-colors"
            >
              Lisa tähtpäev
            </button>
            <button
              onClick={() => {
                setAddingOcc(false);
                onChangeOcc('person', '');
                onChangeOcc('occasion', '');
                onChangeOcc('date', '');
              }}
              className="text-gray-400 text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Tühista
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAddingOcc(true)}
          className="flex items-center justify-center gap-2 w-full text-[#E8195A] text-sm font-semibold py-3.5 px-4 rounded-xl border-2 border-dashed border-[#E8195A]/25 hover:bg-[#FFF0F5] transition-colors"
        >
          <span className="text-lg leading-none font-light">+</span> Lisa tähtpäev
        </button>
      )}
    </div>
  );
}

// ── Step 5: Delivery frequency ───────────────────────────────────────────────

function Step5({ data, setData }: { data: WizardData; setData: SetData }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-5">
        Tarne sagedus
      </p>
      <h2
        className="text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
      >
        Kui tihti soovid<br />
        <span className="text-[#E8195A]">lilli saada?</span>
      </h2>
      <p className="text-gray-400 mb-8 text-base">
        Viimane küsimus! Katkestada saab igal ajal.
      </p>

      <div className="space-y-3">
        {DELIVERY_FREQS.map((f) => {
          const sel = data.deliveryFreq === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setData((d) => ({ ...d, deliveryFreq: f.id }))}
              className={`w-full text-left p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                sel
                  ? 'border-[#E8195A] bg-[#FFF0F5] shadow-[0_4px_20px_rgba(232,25,90,0.10)]'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:-translate-y-0.5'
              }`}
            >
              <div>
                <div className="font-semibold text-gray-900">{f.label}</div>
                <div className="text-[#E8195A] text-xs font-medium mt-0.5">{f.sublabel}</div>
                <div className="text-gray-400 text-xs mt-1">{f.desc}</div>
              </div>
              {sel && (
                <div className="w-6 h-6 bg-[#E8195A] rounded-full flex items-center justify-center shrink-0">
                  <Check />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Confirmation screen ──────────────────────────────────────────────────────

const CONCIERGE_STAGES = [
  { id: 'agent1', label: 'Profiili analüüs' },
  { id: 'agent2', label: 'Lillede valik' },
  { id: 'agent3', label: 'Isiklik soovitus' },
];
const STAGE_ORDER = ['agent1', 'agent2', 'agent3', 'done'];

function ConfirmationScreen({ data }: { data: WizardData }) {
  const firstName = data.name.split(' ')[0];
  const styleLabel = HOME_STYLES.find((s) => s.id === data.homeStyle)?.label ?? '';
  const colourLabel = COLOUR_PREFS.find((c) => c.id === data.colourPref)?.label ?? '';
  const freqLabel = DELIVERY_FREQS.find((f) => f.id === data.deliveryFreq)?.label ?? '';

  const [agentStage, setAgentStage] = useState<'idle' | 'agent1' | 'agent2' | 'agent3' | 'done' | 'error'>('idle');
  const [recommendation, setRecommendation] = useState('');
  const [recommendError, setRecommendError] = useState('');

  useEffect(() => {
    if (!data.email) return;
    let cancelled = false;

    async function fetchRecommendation() {
      setAgentStage('agent1');
      try {
        const res = await fetch('/api/concierge/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        });

        if (!res.body) return;
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const parts = buf.split('\n\n');
          buf = parts.pop() ?? '';
          for (const part of parts) {
            const line = part.replace(/^data:\s*/, '').trim();
            if (!line) continue;
            try {
              const event = JSON.parse(line) as { stage: string; message: string; result?: string };
              if (cancelled) return;
              if (event.stage === 'done') {
                setAgentStage('done');
                setRecommendation(event.result ?? '');
              } else if (event.stage === 'error') {
                setAgentStage('error');
                setRecommendError(event.message);
              } else {
                setAgentStage(event.stage as 'agent1' | 'agent2' | 'agent3');
              }
            } catch { /* ignore parse errors */ }
          }
        }
      } catch {
        if (!cancelled) {
          setAgentStage('error');
          setRecommendError('Soovituse laadimine ebaõnnestus.');
        }
      }
    }

    fetchRecommendation();
    return () => { cancelled = true; };
  }, [data.email]);

  const currentIdx = STAGE_ORDER.indexOf(agentStage);
  const isWorking = agentStage !== 'idle' && agentStage !== 'done' && agentStage !== 'error';

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="max-w-lg w-full">
        {/* Animated flower ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-full bg-[#E8195A]/10 animate-ping"
            style={{ animationDuration: '2.5s' }}
          />
          <div className="relative w-24 h-24 bg-gradient-to-br from-[#FFF0F5] to-[#EDE0FF] rounded-full flex items-center justify-center shadow-[0_0_0_5px_rgba(232,25,90,0.07)]">
            <span className="text-4xl">🌸</span>
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl text-gray-900 mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
        >
          Suurepärane,<br />
          <span className="text-[#E8195A]">{firstName}!</span>
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
          {agentStage === 'done'
            ? 'Sinu personaalne lillekollektsioon on valmis!'
            : 'Sinu lillenõustaja profiil on valmis. Koostan sulle kohe personaalse soovituse.'}
        </p>

        {/* Agent progress */}
        {(isWorking || agentStage === 'idle') && (
          <div className="bg-[#FFF0F5] rounded-3xl p-6 mb-8 text-left">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.22em] mb-5">
              Koostan soovitust
            </p>
            <div className="space-y-4">
              {CONCIERGE_STAGES.map((stage) => {
                const stageIdx = STAGE_ORDER.indexOf(stage.id);
                const isDone = currentIdx > stageIdx;
                const isActive = agentStage === stage.id;
                return (
                  <div key={stage.id} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isDone
                          ? 'bg-[#E8195A]'
                          : isActive
                          ? 'bg-white ring-2 ring-[#E8195A]'
                          : 'bg-gray-100'
                      }`}
                    >
                      {isDone ? (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isActive ? (
                        <div className="w-2 h-2 bg-[#E8195A] rounded-full animate-pulse" />
                      ) : null}
                    </div>
                    <span
                      className={`text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-gray-900 font-semibold'
                          : isDone
                          ? 'text-gray-300 line-through'
                          : 'text-gray-300'
                      }`}
                    >
                      {stage.label}
                    </span>
                    {isActive && (
                      <span className="text-xs text-[#E8195A] ml-auto animate-pulse">
                        töötab…
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {agentStage === 'done' && recommendation && (
          <div className="bg-[#FFF0F5] rounded-3xl p-6 sm:p-7 mb-8 text-left">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.22em] mb-4">
              Sinu personaalne soovitus
            </p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {recommendation}
            </p>
          </div>
        )}

        {agentStage === 'error' && (
          <div className="bg-red-50 rounded-3xl p-5 mb-8 text-left">
            <p className="text-sm text-red-500">{recommendError}</p>
          </div>
        )}

        {/* Summary card */}
        <div className="bg-[#FFF0F5] rounded-3xl p-6 sm:p-7 text-left mb-8">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.22em] mb-5">
            Sinu profiil
          </p>
          <div className="space-y-0">
            {[
              { label: 'Stiil', value: styleLabel },
              { label: 'Värvid', value: colourLabel },
              { label: 'Tarne', value: freqLabel },
              {
                label: 'Tähtpäevad',
                value:
                  data.occasions.length > 0
                    ? `${data.occasions.length} tähtpäeva lisatud`
                    : 'Pole lisatud',
              },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`flex items-center justify-between py-3.5 ${
                  i < arr.length - 1 ? 'border-b border-[#E8195A]/10' : ''
                }`}
              >
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#E8195A] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#c9144a] transition-all hover:scale-105"
        >
          Tagasi avalehele
        </Link>
      </div>
    </div>
  );
}
