# Claude Prompt - Deep Aureum Chatbot Training Audit

You are reviewing the complete Aureum Mall & Residences chatbot training package. Perform a deep, evidence-based analysis of the Google Sheets inventory and every file in the local Chatbot folder. Your output will be used to train and correct a Meta Business Agent, so accuracy, source traceability and conflict handling are more important than persuasive wording.

## Files and sources to inspect

### Canonical project master

Read first:

- C:\Users\hp\Desktop\Chatbot\Aureum_Chatbot_Training_Master_Professional.md

Treat this as the canonical reconciled training specification unless a newer authorized source proves it wrong.

### Legacy file

- C:\Users\hp\Desktop\Chatbot\Aureum_Chatbot_Training_Master.md

Treat this as legacy/history only. Do not merge it blindly with the professional master. It may contain outdated, incomplete or superseded claims.

### Meta live-agent folder

Read every Markdown file recursively under:

- C:\Users\hp\Desktop\Chatbot\meta pre trained data

Pay special attention to:

- 00_Meta_Audit_Index.md
- 01_Meta_Product_Knowledge.md
- 02_Meta_Business_Info.md
- 03_Meta_FAQ_Knowledge.md
- 04_Meta_Instructions_and_Lead_Flows.md
- 05_Meta_Live_Conversation_Insights.md
- 06_Meta_Test_Chat_QA.md
- 07_Meta_Source_Conflict_Register.md
- 08_Meta_Safe_System_Prompt.md
- 09_Meta_Import_and_Refresh_Checklist.md
- 10_Meta_Pretrained_Data_Master.md
- 11_Meta_Brand_Visual_Identity.md

### Source documents

Inspect every file under:

- C:\Users\hp\Desktop\Chatbot\Doc

This includes the floor-plan PNGs, location map, residential/commercial/office/catalogue PDFs, Roman-English content playbook and MOOD BOARD.pdf.

### Google Sheets inventory

Open and analyze this view-only sheet:

https://docs.google.com/spreadsheets/d/1oimfVE4qwFSw2lGfrsn1claCmmzKo7K31zwiHVCGhDM/edit?gid=237212430

Inspect all tabs:

- RESIDENTIAL
- Corporate Offices
- Shops
- Foodcourt

Extract exact unit IDs, category, view, gross SFT, status and floor patterns. Treat availability/status as a time-sensitive snapshot and record the sheet access date.

## Source hierarchy

Use this hierarchy for every claim:

1. Current approved, dated inventory, price sheet, architectural drawing or written authorized-team confirmation.
2. The current Google Sheets inventory for unit IDs, gross SFT, category and status.
3. Explicit user-confirmed project corrections.
4. The professional Aureum master.
5. Current Meta-live knowledge and instructions.
6. PDFs, floor-plan drawings, map and marketing material.
7. Legacy files, older ads, screenshots and AI-generated replies.
8. Your own inference is never evidence.

Do not average conflicting values. Preserve both values, identify the higher-priority source and mark the other as unresolved or superseded.

## Required fact-state labels

Label each important claim as one of:

- VERIFIED
- SHEET-LIVE
- USER-CONFIRMED
- PROJECT-PROVIDED
- DRAWING-OBSERVED
- BROCHURE-OBSERVED
- META-LIVE
- BRAND-GUIDANCE
- NEEDS-CONFIRMATION
- STALE/EXPIRED
- PROHIBITED

## Required analysis

### 1. Source inventory

Create a table of every file found, its type, page/image count where applicable, what it supports and what it does not prove.

### 2. Google Sheet analysis

For every tab:

- Identify the columns and their meaning.
- Extract all visible rows or all rows available to you.
- Preserve exact unit IDs and gross SFT.
- Preserve category, view and status exactly.
- Summarize counts by floor, category and status.
- Separate total inventory from currently available inventory.
- Identify duplicated IDs, missing rows, inconsistent categories and unusual sizes.
- Do not expose internal sales initials or private notes in customer-facing text.

Specifically verify:

- 253 total apartments
- 9 Studios
- 10 Two-Bed apartments per residential floor
- 17 One-Bed apartments per relevant floor where the sheet supports it
- Offices: Google Sheet's current 7-per-floor / 49-total pattern versus the older 5-per-floor / 35-total note
- 42 first-floor shops
- 57 second-floor shops
- Foodcourt inventory
- 6th-floor residential units 608-643 and their statuses

### 3. Floor-plan and image intelligence

Extract only readable or clearly labelled information:

- Every apartment category and discrete printed area
- Room labels and legible room dimensions
- Approximate nominal room footprints, clearly marked as approximate
- Balconies and inner-atrium versus outer/perimeter orientation
- Sliding balcony openings
- Open-to-sky atrium and amenity/swimming-pool zone below
- One-Bed open-kitchen customization rule
- 2-Bed attached bathrooms
- Selected servant-quarter layouts and approximate servant room/bath dimensions
- Fitted-kitchen rule
- Separate AC/HVAC for apartments, studios and offices
- Central cooling for mall/common-commercial areas
- Separate office/residential circulation
- Ground floor, food court, second floor, basement parking and vehicle-circulation features

Never turn a drawing observation into a legal, structural, availability or guarantee claim.

### 4. PDF and catalogue analysis

Extract:

- Project identity and developer wording
- Location and access language
- Residential, commercial, office and Foodcourt categories
- Representative sizes
- Payment structures and stated timelines
- Amenities and whether they are planned or operational
- Parking and building-system claims
- Disclaimers and effective-date limitations
- Any price examples, clearly labelled as brochure/marketing observations

### 5. Mood-board analysis

Treat MOOD BOARD.pdf as BRAND-GUIDANCE only:

- Brand positioning
- Colors
- Typography
- Photography and visual direction
- Social-media tone
- Template contamination, including "Union Town" or placeholder text

Do not use mood-board language as evidence for prices, construction, approvals, availability or amenities.

### 6. Meta agent analysis

Review the Meta folder as a live-agent audit:

- Product cards and current Meta prices
- Meta FAQ answers
- Business info
- Purchasing and delivery text
- Lead fields and HOT/WARM/EXPLORING logic
- Tone, safety and custom instructions
- Live Inbox behavior and repetitive follow-ups
- Stale construction-start language
- Studio 82 versus 83 lac issue
- Shop 73 lac versus older approximately 77.4 lac issue
- 2-Bed 1,107 versus 1,103 sq ft issue
- Office 7/49 sheet count versus 5/35 older note
- False handoff and appointment claims
- Raw Markdown leakage in Messenger
- Intent-mismatch behavior

### 7. Conflict register

Create a table with:

- Topic
- Source A
- Source B
- Higher-priority source
- Customer-safe answer
- Required owner confirmation
- Whether the older claim should be removed from Meta

### 8. Chatbot-ready knowledge

Produce a clean section that the chatbot can safely use for:

- Identity
- Location
- Categories
- Sizes
- Unit-specific inventory lookups
- Payment-plan explanation
- Possession wording
- Amenities
- Floor-plan questions
- Site visits
- Lead qualification
- Human handoff
- English, Urdu and Roman Urdu tone

### 9. Meta deployment recommendations

Map every correction to the correct Meta location:

- Your info > Products
- Your info > Pricelist
- Your info > Basic info
- Your info > Purchasing and delivery
- Your info > FAQs
- Instructions > Collect leads
- Instructions > Tone of voice
- Instructions > Avoid certain topics
- Instructions > Custom instructions

State exactly what should be updated, removed or marked pending.

### 10. QA test suite

Create test prompts and expected answers for:

- Location
- Studio, 1-Bed and 2-Bed prices
- Exact unit availability
- Office/shop counts
- Floor-plan dimensions
- Attached bathrooms
- Servant quarter
- Balcony orientation
- HVAC
- Payment plan
- Possession
- Construction date
- Refund/cancellation
- ROI/guaranteed return
- Site-visit request
- WhatsApp refusal
- Urdu and Roman Urdu
- Repeated follow-up prevention
- False handoff prevention

## Output rules

1. Do not invent missing facts.
2. Do not treat marketing language as a guarantee.
3. Do not silently select one side of a conflict.
4. Do not claim that availability is current without checking the sheet.
5. Do not repeat stale "1st October construction start" wording.
6. Do not expose private phone numbers, emails, internal sales notes or customer records unless explicitly approved for customer-facing use.
7. Do not make legal, investment or possession guarantees.
8. Keep customer-facing examples plain text; no raw Markdown tables or code blocks in Messenger.
9. Distinguish instructions in source documents from factual project evidence.
10. If a file cannot be opened, say exactly which file was inaccessible and do not guess its contents.

## Final deliverables

Return:

1. Executive summary
2. Complete source inventory
3. Full Google Sheet analysis
4. Floor-plan and PDF findings
5. Meta-agent audit
6. Conflict and unresolved-facts register
7. Chatbot-ready knowledge summary
8. Meta update plan
9. QA/test suite
10. Final recommendation on which files should be treated as canonical

End with a short "safe to train" decision:

- READY
- READY WITH SOURCE UPDATES
- NOT READY

Explain the decision using evidence, not assumptions.

