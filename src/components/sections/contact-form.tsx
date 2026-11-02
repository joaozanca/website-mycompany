'use client'

import { CheckCircle2, ChevronDown, LockKeyhole, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { actionVariants } from '@/components/ui/action-link'
import { services, whatsappLink } from '@/config/site'
import { buildQuoteMessage, validateQuote, type QuoteErrors, type QuoteFields } from '@/lib/quote-message'
import { cn } from '@/lib/utils'

const fieldClass =
  'h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-ink focus:ring-3 focus:ring-primary/40 aria-invalid:border-danger'

// Ordem dos campos na tela: o foco vai para o primeiro campo com erro.
const fieldOrder: (keyof QuoteFields)[] = ['nome', 'telefone', 'email', 'cidade', 'servico', 'mensagem']

function Field({
  name,
  label,
  optional,
  error,
  className,
  children,
}: {
  name: keyof QuoteFields
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={name} className="text-sm font-semibold text-foreground">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-erro`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<QuoteErrors>({})

  function readFields(form: HTMLFormElement): QuoteFields {
    const data = new FormData(form)
    const get = (k: keyof QuoteFields) => String(data.get(k) ?? '').trim()
    return {
      nome: get('nome'),
      telefone: get('telefone'),
      email: get('email'),
      cidade: get('cidade'),
      servico: get('servico'),
      mensagem: get('mensagem'),
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fields = readFields(form)
    const found = validateQuote(fields)
    setErrors(found)

    const firstInvalid = fieldOrder.find((k) => found[k])
    if (firstInvalid) {
      setSent(false)
      // Centraliza o campo para ele não ficar escondido atrás do topo fixo.
      const field = form.querySelector<HTMLElement>(`#${firstInvalid}`)
      field?.focus({ preventScroll: true })
      field?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    const url = whatsappLink(buildQuoteMessage(fields))
    // Sem a opção "noopener" porque com ela o window.open sempre retorna null e não daria para
    // saber se a aba abriu. O opener é desligado à mão; se o navegador bloquear a aba nova,
    // o WhatsApp abre na própria aba.
    const tab = window.open(url, '_blank')
    if (tab) tab.opener = null
    else window.location.href = url
    setSent(true)
  }

  // Ao corrigir um campo, a mensagem de erro dele some.
  function handleInput(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as keyof QuoteFields
    if (!errors[name]) return
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const invalid = (name: keyof QuoteFields) =>
    errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-erro` } : {}

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="nome" label="Nome" error={errors.nome} className="sm:col-span-2">
          <input
            id="nome"
            name="nome"
            required
            autoComplete="name"
            maxLength={80}
            placeholder="Seu nome completo"
            className={fieldClass}
            {...invalid('nome')}
          />
        </Field>
        <Field name="telefone" label="Telefone / WhatsApp" error={errors.telefone}>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            placeholder="(00) 00000-0000"
            className={fieldClass}
            {...invalid('telefone')}
          />
        </Field>
        <Field name="email" label="E-mail" optional error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="voce@email.com"
            className={fieldClass}
            {...invalid('email')}
          />
        </Field>
        <Field name="cidade" label="Cidade" error={errors.cidade} className="sm:col-span-2">
          <input
            id="cidade"
            name="cidade"
            required
            autoComplete="address-level2"
            maxLength={60}
            placeholder="Ex.: São José dos Pinhais"
            className={fieldClass}
            {...invalid('cidade')}
          />
        </Field>
        <Field name="servico" label="Tipo de serviço" error={errors.servico} className="sm:col-span-2">
          <div className="relative">
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <select
              id="servico"
              name="servico"
              required
              defaultValue=""
              className={cn(fieldClass, 'appearance-none pr-10')}
              {...invalid('servico')}
            >
              <option value="" disabled>
                Selecione um serviço
              </option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Outro">Outro</option>
            </select>
          </div>
        </Field>
        <Field name="mensagem" label="Mensagem" optional className="sm:col-span-2">
          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            maxLength={1000}
            placeholder="Descreva brevemente o que você precisa"
            className={cn(fieldClass, 'h-auto resize-none py-3')}
          />
        </Field>
      </div>

      <button type="submit" className={cn(actionVariants({ size: 'lg' }), 'w-full')}>
        <Send />
        Enviar
      </button>

      <p className="text-center text-xs text-muted-foreground" role="status">
        {sent ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-success">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Abrimos o WhatsApp com sua mensagem. É só enviar!
          </span>
        ) : (
          'Ao enviar, sua solicitação é encaminhada para o nosso WhatsApp.'
        )}
      </p>

      {/* Aviso de privacidade (LGPD): fica sempre visível, mesmo depois do envio (ZV-39). */}
      {/* Cadeado dentro da linha de texto, para ficar junto da primeira palavra em qualquer largura. */}
      <p className="text-center text-sm text-muted-foreground">
        <LockKeyhole className="mr-1.5 inline size-4 align-[-0.15em]" aria-hidden="true" />
        Seus dados não ficam guardados no site: são usados só para montar a mensagem do WhatsApp para a ZancaVolt.
      </p>
    </form>
  )
}
