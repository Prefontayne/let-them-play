'use client'
import React, { useMemo, useState } from 'react'

const CAMPAIGN = {
  name: 'Let Them Play Canada',
  hashtag: '#LetThemPlayCanada',
  signupUrl: 'https://forms.gle/meR1ATTFeNM8zyaf8',
  toolkitUrl: '', // optional
  handle: '@LetThemPlayCA',
}

const Section = ({ title, children, id }: {title: string; children: React.ReactNode; id?: string}) => (
  <section id={id} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
    <div className="text-slate-700 leading-relaxed text-base sm:text-lg">{children}</div>
  </section>
)

const Card = ({ children }: {children: React.ReactNode}) => (
  <div className="rounded-2xl shadow-lg p-6 bg-white border border-slate-200">
    {children}
  </div>
)

export default function Landing() {
  const [showCallMP, setShowCallMP] = useState(false)
  const [showEmailMin, setShowEmailMin] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copyBtn1, setCopyBtn1] = useState('Copy')
  const [copyBtn2, setCopyBtn2] = useState('Copy')
  const [copyBtn3, setCopyBtn3] = useState('Copy')

  const mpScript = useMemo(() => (
`Hello, my name is [Name], I live in [Postal Code]. I’m calling about the reported decision to bar the Irish rap group Kneecap from entering Canada.

I support free expression and public safety. Canada already has a remedy — a Temporary Resident Permit with conditions — that allows supervised, time-limited entry.

My ask: Will the MP (a) request that IRCC disclose the statutory basis and non-classified record, and (b) urge the Minister to issue TRPs with conditions so the October shows can proceed?

Thank you for passing this along. Could I get a written response to my email at [email]?`
  ), [])

  const ministerEmail = useMemo(() => (
`Subject: Let Them Play — TRP with safeguards

Dear Ministers,

Please reverse the decision preventing the Irish rap group Kneecap from performing in Canada by issuing Temporary Resident Permits with conditions for the limited show dates. This balances free expression and public safety.

Please also publish the statutory ground and the non-classified record for the inadmissibility finding.

Respectfully,
[Name] · [City] · [Email]`
  ), [])

  const shareCaption = useMemo(() => (
`${CAMPAIGN.name}: Canada can safeguard the public AND let artists perform. Use a Temporary Resident Permit with conditions, and publish the legal basis. 3-min actions: call your MP, email the Ministers, join the list. ${CAMPAIGN.hashtag}`
  ), [])

  function mailToDraft(text: string) {
    const [subjectLine, ...rest] = text.split('\n')
    const subject = subjectLine.replace(/^Subject:\s*/, '')
    const body = rest.join('\n')
    const href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  async function copy(text: string, setState: (s: string)=>void) {
    try {
      await navigator.clipboard.writeText(text)
      setState('Copied ✓')
      setTimeout(()=>setState('Copy'), 2000)
    } catch {
      setState('Press ⌘/Ctrl+C')
      setTimeout(()=>setState('Copy'), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {CAMPAIGN.name}
          </h1>
          <p className="mt-3 text-slate-700 max-w-2xl">
            A peaceful, nonpartisan community campaign asking Ottawa to use a <span className="font-semibold">Temporary Resident Permit (with conditions)</span> and to publish the legal basis for the decision — so the shows can proceed safely.
          </p>
          <p className="mt-2 text-sm text-slate-500">We condemn antisemitism and all hate; we reject incitement and violence.</p>
        </div>
        <div className="hidden sm:block text-sm text-slate-500 mt-1">{CAMPAIGN.handle}</div>
      </header>

      {/* Context block */}
      <Section title="What’s happening (quick context)">
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-2">Canada barred Kneecap from entry (Sept 19, 2025)</h3>
            <p>
              Federal officials announced the Irish rap trio were deemed ineligible to enter ahead of planned October
              shows in Toronto and Vancouver. Allegations referenced hate/violence and support for listed groups —
              allegations the artists have publicly denied. This campaign does <span className="font-semibold">not</span> speak for the band;
              it asks Ottawa for a transparent, proportionate remedy that safeguards the public while respecting free expression.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Who are Kneecap?</h3>
            <p>
              A Belfast-based, bilingual (Irish/English) rap trio known for political satire and provocative stage art.
              They’ve drawn large crowds across the UK/Ireland and are widely covered by major outlets. Members state
              they <span className="font-semibold">condemn attacks on civilians and deny supporting terrorist organisations</span>.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">What was planned in Canada?</h3>
            <p>
              Four ticketed concerts were scheduled: <span className="font-semibold">Toronto (Oct 14–15, 2025)</span> and
              <span className="font-semibold"> Vancouver (Oct 22–23, 2025)</span>.
            </p>
          </Card>
        </div>
      </Section>

      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 items-center">
          <button className="px-5 py-3 rounded-2xl shadow border hover:shadow-md" onClick={()=>setShowCallMP(true)}>Call your MP</button>
          <button className="px-5 py-3 rounded-2xl shadow border hover:shadow-md" onClick={()=>mailToDraft(ministerEmail)}>Email the Ministers</button>
          {CAMPAIGN.signupUrl ? (
            <a className="px-5 py-3 rounded-2xl shadow text-white bg-emerald-600 hover:bg-emerald-700" href={CAMPAIGN.signupUrl}>Join the list</a>
          ) : (
            <a className="px-5 py-3 rounded-2xl shadow border" href="#join">Join the list</a>
          )}
          <button className="px-5 py-3 rounded-2xl shadow border hover:shadow-md" onClick={()=>setShowShare(true)}>Share this</button>
        </div>
      </div>

      <Section title="Why this is reasonable">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">Proportionate remedy</h3>
            <p>Canada can allow time-limited, supervised entry using a Temporary Resident Permit with enforceable conditions.</p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Transparency builds trust</h3>
            <p>Publishing the statutory basis and non-classified record avoids chilling effects on lawful cultural exchange.</p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Anti-hate, pro-safety</h3>
            <p>We explicitly condemn antisemitism and all hate, and reject incitement or violence. Safety plans and venue rules still apply.</p>
          </Card>
        </div>
      </Section>

      {/* Specific asks */}
      <Section title="Our specific ask">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">1) Transparency</h3>
            <p>Publish the statutory ground(s) and non-classified record relied upon for the inadmissibility finding. Canadians deserve to understand the basis for major arts restrictions.</p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">2) Proportionate remedy</h3>
            <p>Use a <span className="font-semibold">Temporary Resident Permit (TRP)</span> with enforceable conditions (time-limited entry for show dates, venue rules, security plans, zero incitement/hate) so the performances can proceed safely.</p>
          </Card>
        </div>
      </Section>

      <Section title="Take action in 3 minutes" id="actions">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <h4 className="text-lg font-semibold mb-3">1) Call your MP</h4>
            <p className="mb-4">Use our short script. Tip: include your postal code so staff can log you as a constituent.</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl border" onClick={()=>setShowCallMP(true)}>View script</button>
              <a
  className="px-4 py-2 rounded-xl border"
  href="https://www.ourcommons.ca/members/en"
  target="_blank"
  rel="noreferrer"
>
  Find my MP
</a>

            </div>
          </Card>
          <Card>
            <h4 className="text-lg font-semibold mb-3">2) Email the Ministers</h4>
            <p className="mb-4">Open a prefilled draft and add recipients (IRCC + Public Safety). Personalize the first sentence.</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl border" onClick={()=>mailToDraft(ministerEmail)}>Open email draft</button>
              <button className="px-4 py-2 rounded-xl border" onClick={()=>setShowEmailMin(true)}>View text</button>
            </div>
          </Card>
          <Card>
            <h4 className="text-lg font-semibold mb-3">3) Join the list</h4>
            <p className="mb-4">Get the e-petition link and coordinated call times. We send only campaign updates.</p>
            {CAMPAIGN.signupUrl ? (
              <a className="px-4 py-2 rounded-xl border w-full inline-block text-center" href={CAMPAIGN.signupUrl}>Open signup</a>
            ) : (
              <div id="join" className="space-y-3">
                <form onSubmit={(e)=>{e.preventDefault(); alert('Add your signup URL in CAMPAIGN.signupUrl.')}} className="flex gap-2">
                  <input type="email" placeholder="Email address" required className="flex-1 px-3 py-2 rounded-xl border" />
                  <button className="px-4 py-2 rounded-xl border">Notify me</button>
                </form>
                <p className="text-sm text-slate-500">No list tool connected. Add your Mailchimp/Substack/Google Form URL in the config.</p>
              </div>
            )}
          </Card>
        </div>
      </Section>

      <Section title="Share this">
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-700">Post this caption anywhere. Tag {CAMPAIGN.handle || 'the campaign'} and use {CAMPAIGN.hashtag}.</p>
            <button onClick={()=>copy(shareCaption, setCopyBtn3)} className="px-4 py-2 rounded-xl border">{copyBtn3}</button>
          </div>
          <pre className="mt-3 bg-slate-50 rounded-xl p-4 text-sm whitespace-pre-wrap">{shareCaption}</pre>
        </Card>
      </Section>

      <Section title="FAQ">
        <div className="space-y-6">
          <Card>
            <h4 className="font-semibold">Do you speak for the band?</h4>
            <p>No. This is a community-led effort. We do not claim affiliation or represent their legal process.</p>
          </Card>
          <Card>
            <h4 className="font-semibold">Is this political?</h4>
            <p>It’s rights-focused and nonpartisan: transparency + a proportionate, lawful remedy (TRP with conditions). We condemn hate and incitement.</p>
          </Card>
          <Card>
            <h4 className="font-semibold">How can I help if I have 2 minutes?</h4>
            <p>Make one call to your MP and send one email to the Ministers. Then share the link using {CAMPAIGN.hashtag}.</p>
          </Card>
        </div>
      </Section>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-slate-500">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>© {new Date().getFullYear()} {CAMPAIGN.name}. Peaceful · Nonpartisan · Anti-hate.</div>
          <div className="flex gap-4">
            <a href="#actions" className="hover:underline">Take action</a>
            <a href="#find-mp" className="hover:underline">Find my MP</a>
            {CAMPAIGN.toolkitUrl && <a href={CAMPAIGN.toolkitUrl} className="hover:underline">Toolkit</a>}
          </div>
        </div>
      </footer>

      {showCallMP && (
        <Modal title="Call your MP — script" onClose={()=>setShowCallMP(false)}>
          <p className="mb-3 text-slate-700">Tip: include your postal code so staff can verify you’re a constituent.</p>
          <pre className="bg-slate-50 rounded-xl p-4 text-sm whitespace-pre-wrap">{mpScript}</pre>
          <div className="mt-3">
            <button className="px-4 py-2 rounded-xl border" onClick={()=>copy(mpScript, setCopyBtn1)}>{copyBtn1}</button>
          </div>
          <div id="find-mp" className="mt-6 text-sm text-slate-500">
  Don’t know your MP? Use the postal-code lookup on the House of Commons website.
  <br />
  <a
    className="underline"
    href="https://www.ourcommons.ca/members/en"
    target="_blank"
    rel="noreferrer"
  >
    Find my MP
  </a>
</div>

        </Modal>
      )}

      {showEmailMin && (
        <Modal title="Email text (paste into your client)" onClose={()=>setShowEmailMin(false)}>
          <p className="mb-2">Paste this into your email app and add recipients for IRCC and Public Safety. Personalize the first line.</p>
          <pre className="bg-slate-50 rounded-xl p-4 text-sm whitespace-pre-wrap">{ministerEmail}</pre>
          <div className="mt-3">
            <button className="px-4 py-2 rounded-xl border" onClick={()=>copy(ministerEmail, setCopyBtn2)}>{copyBtn2}</button>
          </div>
        </Modal>
      )}

      {showShare && (
        <Modal title="Share this caption" onClose={()=>setShowShare(false)}>
          <pre className="bg-slate-50 rounded-xl p-4 text-sm whitespace-pre-wrap">{shareCaption}</pre>
          <div className="mt-3">
            <button className="px-4 py-2 rounded-xl border" onClick={()=>copy(shareCaption, setCopyBtn3)}>{copyBtn3}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ title, children, onClose }:{title:string; children:React.ReactNode; onClose:()=>void}){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 max-w-3xl w-[92%] sm:w-[85%] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-xl border">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
