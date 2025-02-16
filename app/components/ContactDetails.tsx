import { useParams } from 'next/navigation';

const translations = {
  en: {
    title: 'Contact & Bank Details',
    contactTitle: 'Contact Information',
    bankTitle: 'Bank Account Details',
    bankNote: 'For gifts and contributions',
    beneficiary: 'Beneficiary',
    bankName: 'Bank Name',
    bankAddress: 'Bank Address',
    iban: 'IBAN',
    swift: 'BIC/SWIFT',
    correspondentBic: 'Correspondent Bank BIC'
  },
  es: {
    title: 'Contacto y Datos Bancarios',
    contactTitle: 'Información de Contacto',
    bankTitle: 'Datos Bancarios',
    bankNote: 'Para regalos y contribuciones',
    beneficiary: 'Beneficiario',
    bankName: 'Nombre del Banco',
    bankAddress: 'Dirección del Banco',
    iban: 'IBAN',
    swift: 'BIC/SWIFT',
    correspondentBic: 'BIC del Banco Corresponsal'
  }
};

export default function ContactDetails() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang as keyof typeof translations];

  return (
    <section id="details" className="w-full py-24 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16 text-neutral-800">
          {t.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-playfair mb-6 text-neutral-800">
              {t.contactTitle}
            </h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">Laura Gomez Gomez</p>
                  <p className="font-mono text-neutral-600">+34 678 825 070</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">Shantanu Garg</p>
                  <p className="font-mono text-neutral-600">+34 611 719 771</p>
                  <p className="font-mono text-neutral-600">+91 783 005 7445</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-playfair mb-6 text-neutral-800">
              {t.bankTitle}
            </h3>
            <div className="space-y-6">
              <p className="font-lora text-neutral-600 italic">
                {t.bankNote}
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.beneficiary}</p>
                  <p className="font-mono text-neutral-600">Shantanu Garg & Laura Gómez Gómez</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.iban}</p>
                  <p className="font-mono text-neutral-600">ES38 1583 0001 1191 9980 7596</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.swift}</p>
                  <p className="font-mono text-neutral-600">REVOESM2</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.bankName}</p>
                  <p className="font-mono text-neutral-600">Revolut Bank UAB</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.bankAddress}</p>
                  <p className="font-mono text-neutral-600">Calle Príncipe de Vergara 132, 4 planta, 28002, Madrid, Spain</p>
                </div>
                <div className="space-y-1">
                  <p className="font-lora text-sm text-neutral-500">{t.correspondentBic}</p>
                  <p className="font-mono text-neutral-600">CHASDEFX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 