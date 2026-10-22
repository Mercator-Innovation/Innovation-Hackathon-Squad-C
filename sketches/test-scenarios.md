# Test scenarios: Gary's Saturday night

**Last run:** 22 Oct, after Spencer's start screen (PR #23), by Anastasia with Claude, in a browser on a laptop. Sections 1, 2, 4 and 6 not run yet.

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
| 3.1 | Exit from every screen | Look for the quick exit on each screen | It's there on every screen, in the same place | Pass: in the header on every screen |
| 3.2 | Exit works | Press quick exit | It leaves straight away for a neutral page (for example, the weather) | Pass: goes straight to BBC Weather |
| 3.3 | Exit leaves no trace | Press quick exit, then press the browser's Back button | It doesn't return to the check-in (on a real build, nothing in the history) | Pass: Back can't return (history replaced) |
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
| 5.1 | Keyboard only | Tab through every screen, then press Enter or Space | Everything can be reached and used. The focus is always visible | Partly: every button reachable, focus ring clear. But Quick exit comes *before* the page in tab order, so once you're in, you have to tab all the way round to reach it |
| 5.2 | Phone width | View at 375 pixels wide | No sideways scrolling. Buttons are big enough to tap | Pass at 375px: no sideways scroll, buttons at least 47px tall |
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

## 7. Start screen and help right now (the trap door)

From Elena's brief (`brief-start-of-journey.md`) and Spencer's start screen.

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 7.1 | First visit, no name | Open the page fresh | No name anywhere. Three ways in: help right now, set up, support someone | Pass |
| 7.2 | Help right now, no sign-up | Tap **I need help right now** | A volunteer who's on now (name, until when). It asks before connecting. No sign-up asked for | Pass. Words repeat: "Jo is a volunteer supporter… Volunteer supporter. Her brother…" |
| 7.3 | Asks for a call, happy path | Say yes. Enter any name and a pretend number. Send | Only a name and number asked for, "only for this one call". Then services open now, a "Who's been told" summary showing the volunteer, and the set-up banner | Pass |
| 7.4 | No name given | Leave the name blank. Enter a number. Send | It still works. The summary reads naturally | Pass: summary says "asked to call you" |
| 7.5 | No number given | Leave the number blank. Send | A clear error next to the field, read out by a screen reader. Focus moves to the field | Pass: error shown and linked to the field, focus moves to it |
| 7.6 | Not a phone number | Type "abc" as the number. Send | It asks for a phone number (or accepts it, if that's agreed) | **Fail?** "abc" accepted as a phone number. Squad to decide |
| 7.7 | Changes mind | On the call-back form, press **Back** | Back to the volunteer offer. Nothing sent | Pass |
| 7.8 | Says no to the volunteer | Tap **No, show me what's open now** | Services open now. "Nobody yet. Nothing has been sent." | Pass. No set-up banner on this path (only after a call-back). Intended? |
| 7.9 | No volunteer on | Remove volunteers from `data/people.js` | Goes straight to services, saying no volunteer is on | Partly: goes to services, but "no volunteer on" is at the very bottom, easy to miss |
| 7.10 | Services open now | At Saturday 11:10pm | Only services open then: not the 10am to 4pm café or the 11pm families line | Pass: café and 11pm families line hidden |
| 7.11 | Just after midnight | Set the demo time to Sunday 00:30 | The night line that runs until 2am still shows | **Fail:** at Sunday 12:30am the Night Line (Saturday 6pm to 2am) doesn't show. Only today's opening times are checked |
| 7.12 | Not built yet | Tap **Set up** and **I want to support someone** | "Coming soon", with a way back. No errors | Pass: "Coming soon" with Back to start |
| 7.13 | Demo sign-in | Tap **Demo: open as Gary** | "Hi Gary. How are you right now?" Name shown only now | Pass: "Hi Gary" only after demo sign-in |
| 7.14 | Start again | From services, tap **Start again** | Back to the welcome screen, with tonight's state cleared | Pass: back to welcome, summary cleared |