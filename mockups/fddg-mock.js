// Shared behaviour for the FDDG mockups.
//  - mobile menu
//  - the inquiry form (built into #inquiry), which branches on whether the
//    client has digital files, paper documents, both, or isn't sure
//  - Option B capability filter, Option C expandable service cards
// The form is a mockup: submitting validates and shows a thank-you panel; nothing is sent.
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- mobile menu ----------
  const toggle = $('#nav-toggle'), links = $('#nav-links');
  if (toggle && links) {
    toggle.onclick = () => links.classList.toggle('open');
    $$('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // ---------- inquiry form ----------
  const mount = $('#inquiry');
  if (mount) {
    mount.innerHTML = `
    <form id="contact-form" novalidate>
      <div class="inq-block">
        <div class="inq-step"><b>1</b>Your documents</div>
        <div class="inq-q">What needs to be examined?</div>
        <div class="choice-grid">
          <label class="choice"><input type="radio" name="doc-kind" value="digital" required><span><i>🖥️</i><strong>Digital files</strong><em>PDFs, Office files, images, email, video</em></span></label>
          <label class="choice"><input type="radio" name="doc-kind" value="paper"><span><i>📜</i><strong>Paper documents</strong><em>Handwriting, signatures, ink, alterations</em></span></label>
          <label class="choice"><input type="radio" name="doc-kind" value="both"><span><i>🗂️</i><strong>Both</strong><em>A mix of digital files and physical originals</em></span></label>
          <label class="choice"><input type="radio" name="doc-kind" value="unsure"><span><i>❔</i><strong>Not sure yet</strong><em>Tell us what you have and we’ll advise</em></span></label>
        </div>

        <div class="cond" id="cond-digital">
          <div class="cond-title">Digital files</div>
          <label class="f">File types <span class="opt">— click once per file (optional)</span></label>
          <div class="bubbles" id="bubbles"></div>
          <input type="hidden" name="file-types" id="file-types">
          <label class="f" style="margin-top:1rem">Do you have the original files?</label>
          <div class="seg" data-hint="hint-digital">
            <label><input type="radio" name="digital-source" value="native"><span>Yes, the original files</span></label>
            <label><input type="radio" name="digital-source" value="printout"><span>Only printouts or scans</span></label>
            <label><input type="radio" name="digital-source" value="unsure"><span>Not sure</span></label>
          </div>
          <div class="hint" id="hint-digital" data-show="printout">Printouts and scans lose most of the digital evidence we examine. If the original file exists anywhere, we can explain how to request it.</div>
        </div>

        <div class="cond" id="cond-paper">
          <div class="cond-title">Paper documents</div>
          <label class="f">What is the concern? <span class="opt">— select any</span></label>
          <div class="chips-pick">
            <label class="chip"><input type="checkbox" name="paper-concern" value="Signature"><span>Signature</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Handwriting"><span>Handwriting</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Altered or added entries"><span>Altered or added entries</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Ink or paper"><span>Ink or paper</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Indented writing"><span>Indented writing</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Typed, printed or copied"><span>Typed, printed or copied</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Page substitution"><span>Page substitution</span></label>
            <label class="chip"><input type="checkbox" name="paper-concern" value="Other"><span>Other</span></label>
          </div>
          <label class="f" style="margin-top:1rem">Do you have the original paper document?</label>
          <div class="seg" data-hint="hint-paper">
            <label><input type="radio" name="paper-source" value="original"><span>Yes, the original</span></label>
            <label><input type="radio" name="paper-source" value="copy"><span>Only a copy</span></label>
            <label><input type="radio" name="paper-source" value="unsure"><span>Not sure</span></label>
          </div>
          <div class="hint" id="hint-paper" data-show="copy">Handwriting can sometimes be compared from a good copy, but ink, paper, and indented-writing tests need the original. Tell us what you have and we’ll advise.</div>
          <p class="cond-note">Please don’t mail original documents until we’ve spoken. We’ll send instructions for shipping them safely.</p>
        </div>
      </div>

      <div class="inq-block">
        <div class="inq-step"><b>2</b>Your matter</div>
        <div class="fields">
          <div><label class="f">Type of matter</label><select name="inquiry-type"><option value="">Select…</option><option>Wills, trusts &amp; probate</option><option>Financial elder abuse</option><option>Family law</option><option>Business or real estate</option><option>Civil litigation</option><option>Criminal matter</option><option>Employment</option><option>Corporate investigation</option><option>Other</option></select></div>
          <div><label class="f">Deadline <span class="opt">— optional</span></label><input type="text" name="deadline" placeholder="e.g. expert disclosure 15 Jan"></div>
          <div class="full"><label class="f">What would you like to know?</label><textarea required name="details" placeholder="Describe the documents and the question at issue. For example: “Was this agreement really signed in 2019?”"></textarea></div>
        </div>
      </div>

      <div class="inq-block">
        <div class="inq-step"><b>3</b>How to reach you</div>
        <label class="f">I am…</label>
        <div class="seg" style="margin-bottom:1rem">
          <label><input type="radio" name="role" value="attorney"><span>An attorney or law office</span></label>
          <label><input type="radio" name="role" value="investigator"><span>A licensed investigator</span></label>
          <label><input type="radio" name="role" value="with-attorney"><span>Working with an attorney</span></label>
          <label><input type="radio" name="role" value="other"><span>Other</span></label>
        </div>
        <div class="fields">
          <div><label class="f">Name</label><input required type="text" name="name" placeholder="Full name"></div>
          <div><label class="f">Email</label><input required type="email" name="email" placeholder="you@example.com"></div>
          <div><label class="f">Phone <span class="opt">— optional</span></label><input type="tel" name="phone" placeholder="(555) 555-5555"></div>
          <div><label class="f">Firm or organization <span class="opt">— optional</span></label><input type="text" name="organization" placeholder="Firm or company"></div>
        </div>
        <label class="agree"><input type="checkbox" name="sms-optin"><span>I agree to receive text messages from Forensic Digital Document Group about my inquiry and case (status updates, scheduling, and follow-ups). Message and data rates may apply. Reply STOP to opt out. Consent is not a condition of any purchase.</span></label>
        <label class="agree"><input required type="checkbox" name="agree-terms"><span>I have read and agree to the <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.</span></label>
      </div>

      <div class="inq-submit"><button type="submit">Send Inquiry →</button><small>Free and confidential. We reply within 24 hours.</small></div>
    </form>
    <div class="thanks" id="thanks">
      <div class="tick">✓</div>
      <h3>Thank you. Your inquiry has been received.</h3>
      <p id="thanks-next">An examiner will review it and reply within 24 hours.</p>
      <ul id="thanks-list"></ul>
      <p>Prefer email? Reach us at <a href="mailto:info@forensicddg.com" style="color:var(--f-link)">info@forensicddg.com</a>.</p>
    </div>`;

    // file-type bubbles
    const TYPES = [
      ['pdf', 'PDF', '#b91c1c', 'PDF'], ['word', 'Word', '#1d4ed8', 'W'], ['excel', 'Excel', '#15803d', 'X'],
      ['ppt', 'PowerPoint', '#c2410c', 'P'], ['image', 'Image', '#6d28d9', 'IMG'], ['video', 'Video', '#0e7490', '▶'],
      ['email', 'Email', '#475569', '@'], ['other', 'Other', '#64748b', '…']
    ];
    const box = $('#bubbles'), hidden = $('#file-types'), counts = {};
    const refresh = () => {
      const parts = [];
      TYPES.forEach(([k, label]) => {
        const n = counts[k], badge = $('#badge-' + k);
        $('#b-' + k).classList.toggle('active', n > 0);
        badge.style.display = n > 0 ? 'inline-flex' : 'none';
        badge.textContent = n;
        if (n > 0) parts.push(n + ' ' + label + (n > 1 ? 's' : ''));
      });
      hidden.value = parts.join(', ');
    };
    TYPES.forEach(([k, label, col, glyph]) => {
      counts[k] = 0;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'bubble'; b.id = 'b-' + k;
      b.innerHTML = `<span class="ic" style="background:${col}">${glyph}</span>${label}<span class="badge" id="badge-${k}"></span>`;
      b.onclick = () => { counts[k]++; refresh(); };
      box.appendChild(b);
    });
    const r = document.createElement('button');
    r.type = 'button'; r.className = 'reset'; r.textContent = '↺ Reset';
    r.onclick = () => { Object.keys(counts).forEach(k => counts[k] = 0); refresh(); };
    box.appendChild(r);

    // branching: which follow-up sections appear
    const form = $('#contact-form');
    const kind = () => (form.elements['doc-kind'].value || '');
    const showBranches = () => {
      const k = kind();
      $('#cond-digital').classList.toggle('show', k === 'digital' || k === 'both');
      $('#cond-paper').classList.toggle('show', k === 'paper' || k === 'both');
    };
    $$('input[name="doc-kind"]', form).forEach(i => i.addEventListener('change', showBranches));

    // hints shown for specific answers
    $$('.seg[data-hint]', form).forEach(seg => {
      const hint = $('#' + seg.dataset.hint);
      $$('input', seg).forEach(i => i.addEventListener('change', () => hint.classList.toggle('show', i.checked && i.value === hint.dataset.show)));
    });

    // mock submit
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!kind()) { form.elements['doc-kind'][0].closest('.inq-block').scrollIntoView({ behavior: 'smooth', block: 'center' }); form.elements['doc-kind'][0].reportValidity(); return; }
      const blank = ['details', 'name', 'email'].map(n => form.elements[n]).find(f => !f.value.trim());
      if (blank) { blank.value = ''; blank.reportValidity(); return; }
      if (!form.checkValidity()) { form.reportValidity(); return; }

      // tailor the "what happens next" list to the answers
      const k = kind(), items = [];
      if (k === 'digital' || k === 'both') items.push('Instructions for sending your digital files without altering them.');
      if (k === 'paper' || k === 'both') items.push('Instructions for safely shipping paper originals to our laboratory.');
      if (k === 'unsure') items.push('A short call or email to work out what you have and what it needs.');
      $('#thanks-list').innerHTML = items.map(t => `<li>${t}</li>`).join('');
      $('#thanks-next').textContent = 'We’ll review it and reply within 24 hours. If it’s something we can help with, we’ll follow up with:';
      form.style.display = 'none';
      $('#thanks').style.display = 'flex';
    });
  }

  // ---------- Option C: expandable service cards ----------
  $$('.card .more').forEach(btn => btn.onclick = () => {
    const card = btn.closest('.card');
    card.classList.toggle('open');
    btn.textContent = card.classList.contains('open') ? 'What we examine −' : 'What we examine +';
  });

  // ---------- Option B: capability filter ----------
  $$('#filter button').forEach(btn => btn.onclick = () => {
    $$('#filter button').forEach(b => b.classList.toggle('on', b === btn));
    const f = btn.dataset.f;
    $$('.row').forEach(row => row.classList.toggle('hide', f !== 'all' && row.dataset.g !== f));
  });
})();
