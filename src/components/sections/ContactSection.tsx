import { Mail, MapPin, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../ui/Button'
import { SectionTitle } from '../ui/SectionTitle'

interface ContactFormData {
  nome: string
  email: string
  objetivo: string
  mensagem: string
}

interface ContactFormErrors {
  nome?: string
  email?: string
  objetivo?: string
  mensagem?: string
}

const initialForm: ContactFormData = {
  nome: '',
  email: '',
  objetivo: '',
  mensagem: '',
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const isEmailValid = useMemo(() => /\S+@\S+\.\S+/.test(formData.email), [formData.email])

  function validate(): ContactFormErrors {
    const nextErrors: ContactFormErrors = {}

    if (!formData.nome.trim()) nextErrors.nome = 'Informe seu nome.'
    if (!formData.email.trim()) nextErrors.email = 'Informe seu email.'
    else if (!isEmailValid) nextErrors.email = 'Informe um email válido.'
    if (!formData.objetivo.trim()) nextErrors.objetivo = 'Informe o objetivo do projeto.'
    if (!formData.mensagem.trim()) nextErrors.mensagem = 'Digite sua mensagem.'
    else if (formData.mensagem.trim().length < 10) nextErrors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres.'

    return nextErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccessMessage('')

    const validation = validate()
    setErrors(validation)

    if (Object.keys(validation).length > 0) return

    setSuccessMessage('Mensagem enviada com sucesso. Retornarei em breve.')
    setFormData(initialForm)
  }

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contato" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Inicie uma conexão direta"
          subtitle="Disponível para projetos estratégicos, consultoria arquitetural e desenvolvimento full stack."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="glass-card">
            <h3 className="text-lg font-semibold text-onSurface">Informações</h3>
            <ul className="mt-5 space-y-4">
              <li className="inline-flex items-center gap-3 text-sm text-onSurfaceVariant">
                <Mail className="h-4 w-4 text-secondary" />
                contato@devengine.sh
              </li>
              <li className="inline-flex items-center gap-3 text-sm text-onSurfaceVariant">
                <MapPin className="h-4 w-4 text-secondary" />
                Global / Operações Distribuídas
              </li>
            </ul>
          </aside>

          <form className="glass-card space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-medium text-onSurface">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                className="input-dark"
                value={formData.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
              />
              {errors.nome ? <p id="erro-nome" className="mt-1 text-xs text-red-300">{errors.nome}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-onSurface">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-dark"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'erro-email' : undefined}
              />
              {errors.email ? <p id="erro-email" className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="objetivo" className="mb-2 block text-sm font-medium text-onSurface">
                Objetivo do projeto
              </label>
              <input
                id="objetivo"
                type="text"
                className="input-dark"
                value={formData.objetivo}
                onChange={(e) => updateField('objetivo', e.target.value)}
                aria-invalid={Boolean(errors.objetivo)}
                aria-describedby={errors.objetivo ? 'erro-objetivo' : undefined}
              />
              {errors.objetivo ? (
                <p id="erro-objetivo" className="mt-1 text-xs text-red-300">{errors.objetivo}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-onSurface">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                className="input-dark min-h-[120px] resize-y"
                value={formData.mensagem}
                onChange={(e) => updateField('mensagem', e.target.value)}
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
              />
              {errors.mensagem ? (
                <p id="erro-mensagem" className="mt-1 text-xs text-red-300">{errors.mensagem}</p>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3">
              <Button type="submit" aria-label="Enviar mensagem">
                Enviar mensagem <Send className="h-4 w-4" />
              </Button>
              {successMessage ? <p className="text-xs text-emerald-300">{successMessage}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
