import { Fragment } from 'react'
import { Section } from '../layout/Section'
import { FadeIn } from '../ui/FadeIn'
import type { WeddingContent } from '../../content/schema'
import { telHref, smsHref } from '../../lib/phoneLinks'
import { IconMessage, IconPhone } from '../icons/ContactActionIcons'

type Props = {
  data: WeddingContent
}

function ContactActions({ phone, label }: { phone: string; label: string }) {
  return (
    <div className="contact-actions" role="group" aria-label={`${label} 연락`}>
      <a className="contact-icon-link" href={telHref(phone)} aria-label={`${label}에게 전화`}>
        <IconPhone className="contact-icon-link__svg" />
      </a>
      <a className="contact-icon-link" href={smsHref(phone)} aria-label={`${label}에게 문자`}>
        <IconMessage className="contact-icon-link__svg" />
      </a>
    </div>
  )
}

function PersonCardCouple({
  role,
  name,
  phone,
  a11yLabel,
}: {
  role: string
  name: string
  phone: string
  a11yLabel: string
}) {
  return (
    <div className="contact-card contact-card--couple">
      <p className="contact-card__role">{role}</p>
      <p className="contact-card__name">{name}</p>
      <ContactActions phone={phone} label={a11yLabel} />
    </div>
  )
}

function PersonCardParent({
  relation,
  name,
  phone,
  a11yLabel,
}: {
  relation: string
  name: string
  phone: string
  a11yLabel: string
}) {
  return (
    <div className="contact-card contact-card--parent">
      <p className="contact-card__identity">
        <span className="contact-card__rel">{relation}</span>{' '}
        <span className="contact-card__nm">{name}</span>
      </p>
      <ContactActions phone={phone} label={a11yLabel} />
    </div>
  )
}

export function ContactSection({ data }: Props) {
  const { groom, bride } = data.couple
  const c = data.contacts

  const groomParents = c.groomParents
  const brideParents = c.brideParents

  return (
    <FadeIn>
      <Section id="contact" title="CONTACT">
        <div className="contact-board">
          <div className="contact-board__grid">
            <PersonCardCouple
              role="신랑"
              name={groom}
              phone={c.groom.phone}
              a11yLabel={`신랑 ${groom}`}
            />
            <PersonCardCouple
              role="신부"
              name={bride}
              phone={c.bride.phone}
              a11yLabel={`신부 ${bride}`}
            />

            <div className="contact-honju">
              <span className="contact-honju__side">신랑 측 혼주</span>
              <span className="contact-honju__mark" aria-hidden>
                ▲
              </span>
              <span className="contact-honju__side">신부 측 혼주</span>
            </div>

            {groomParents.map((p, i) => {
              const bp = brideParents[i]
              if (!bp) return null
              return (
                <Fragment key={`${p.relation}-${p.name}-${bp.name}`}>
                  <PersonCardParent
                    relation={p.relation}
                    name={p.name}
                    phone={p.phone}
                    a11yLabel={`${p.relation} ${p.name}`}
                  />
                  <PersonCardParent
                    relation={bp.relation}
                    name={bp.name}
                    phone={bp.phone}
                    a11yLabel={`${bp.relation} ${bp.name}`}
                  />
                </Fragment>
              )
            })}
          </div>
        </div>
      </Section>
    </FadeIn>
  )
}
