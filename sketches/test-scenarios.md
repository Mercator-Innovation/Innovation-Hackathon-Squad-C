# Test scenarios: Gary's Saturday night

Checks for the first version (journey steps 1 to 4, from `PRD.md`). Run them once the prototype is in `src/`, and copy the results into section 8 of the PRD.

All names and contacts are made up (see `personas.md`).

**Outcome key:** Pass · Fail · Not built yet

## 1. The happy path

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 1.1 | Gary's OK | Open the page. Tap **I'm OK** | A short, warm reply. Nobody is contacted. He can close it or come back later | |
| 1.2 | Gary's not great | Tap **Not great** | It offers options (talk to someone, or just note it). Nothing is sent without him choosing | |
| 1.3 | Gary needs someone, and Lorraine replies | Tap **I need someone**. Agree to message Lorraine. Lorraine (simulated) replies | It asks before sending. It shows the exact message ("Can you call me?") and who it goes to. Then it says "Lorraine has been told" and what happens next | |
| 1.4 | Lorraine doesn't reply | As 1.3, but no reply within the wait time | It offers a volunteer supporter. If he says yes, it shows who has been told | |
| 1.5 | Nobody's available | As 1.4, but no volunteer is available | It shows services open **now** (not 9 to 5 ones), with the time each closes | |

## 2. Consent and control

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 2.1 | Gary says no to Lorraine | Tap **I need someone**. Say **no** to messaging Lorraine | Nothing is sent. It offers a volunteer or services instead, without pressure | |
| 2.2 | Gary changes his mind | Agree to message Lorraine, then go back before it sends | Nothing is sent. He's back at the choice | |
| 2.3 | Gary declines everything | Say no to Lorraine, the volunteer and services | It respects that. It still shows how to come back, and 999 for an emergency | |
| 2.4 | 999 is never automatic | Go through every path | 999 is shown clearly where life may be at risk, but **never** called or messaged for him | |
| 2.5 | He sees who's been told | After any message is sent | A clear list of who's been told, and nobody else | |

## 3. Quick exit

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 3.1 | Exit from every screen | Look for the quick exit on each screen | It's there on every screen, in the same place | |
| 3.2 | Exit works | Press quick exit | It leaves straight away for a neutral page (for example, the weather) | |
| 3.3 | Exit leaves no trace | Press quick exit, then press the browser's Back button | It doesn't return to the check-in (on a real build, nothing in the history) | |

## 4. Failures and edge cases

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 4.1 | No trusted contacts set up | Tap **I need someone** with no contacts | It goes straight to a volunteer or services. No error, no dead end | |
| 4.2 | Battery dies mid-check-in | Close the page partway through, then reopen it | It starts cleanly. Nothing is sent by half-finished steps | |
| 4.3 | Message fails to send | Simulate a failed send to Lorraine | It says plainly that it didn't send, and offers the next option | |
| 4.4 | Taps twice in a hurry | Double-tap **I need someone** or **Send** | Only one message is sent | |
| 4.5 | Slow connection | Throttle the network in the browser (Slow 3G) | The page still loads quickly. It's tiny, with no big images | |
| 4.6 | Late at night | Set the time to Saturday 23:00 | Only services open at that time are shown | |

## 5. Accessibility and phone width

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 5.1 | Keyboard only | Tab through every screen, then press Enter or Space | Everything can be reached and used. The focus is always visible | |
| 5.2 | Phone width | View at 375 pixels wide | No sideways scrolling. Buttons are big enough to tap | |
| 5.3 | Not colour alone | Look at status (sent, waiting, no reply) | Each status has words, not only colour | |
| 5.4 | Contrast | Check text and buttons | Contrast at least 4.5:1 | |
| 5.5 | Screen reader | Use VoiceOver (Cmd + F5 on a Mac) | Headings in order. Buttons and form fields have clear labels | |
| 5.6 | Plain words | Read every screen | Short sentences, "you", no jargon, person-first language | |

## 6. Privacy

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 6.1 | No sign-up | Open the page | No account, no password, no email asked for | |
| 6.2 | No location | Go through every path | No location asked for or shown | |
| 6.3 | Only made-up data | Check `src/data/` | Only synthetic names and numbers | |
