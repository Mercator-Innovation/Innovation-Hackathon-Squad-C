# Test scenarios: Gary's Saturday night

The app is now called **Alex** (it was "Still here" when sections 1 to 7 were first run).

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
| 5.4 | Contrast | Check text and buttons | Contrast at least 4.5:1 | Pass for text: every piece of text on 6 screens is at least 4.5:1 (measured) |
| 5.5 | Screen reader | Use VoiceOver (Cmd + F5 on a Mac) | Headings in order. Buttons and form fields have clear labels | |
| 5.6 | Plain words | Read every screen | Short sentences, "you", no jargon, person-first language | |
| 5.7 | Tap size | Measure every button on each screen | At least 44 by 44 pixels | Pass: smallest button 47px tall on 6 screens (measured) |
| 5.8 | Focus ring contrast | Tab to a button. Compare the yellow ring with what's around it | At least 3:1 against the background | **Fail:** yellow ring is 1.5:1 on the cream page and 1.4:1 on grey buttons (4.6:1 on green). Easy to lose. Fix: add a dark edge to the ring (as GOV.UK does) |
| 5.9 | Button edges | Look at the grey buttons on the cream page | You can tell where each button is | Weak: border is 1.4:1. The words still say it's a button, so low priority |
| 5.10 | Page title per step | Move through the screens. Check the browser tab title | The title says where you are ("Who to tell – Alex") | **Fail:** "Alex" on every screen, so screen reader users don't hear which step they're on |
| 5.11 | Zoom to 200% | Zoom the browser to 200% at laptop width | Nothing cut off, no sideways scroll | Not run |
| 5.12 | Screen changes announced once | With VoiceOver, move to a new screen | The new heading is read once, not twice | Not run. The page both moves focus to the heading and announces changes, so it may read twice |
| 5.13 | Quick exit by keyboard | Press Esc on any screen | Leaves straight away, like the button | **Fail:** no Esc shortcut (see 5.1) |
| 5.14 | Form errors in sign-up and check-in | Leave required fields blank in the new journeys | Clear error next to the field, focus moves there | Not run |

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
| 7.1 | First visit, no name | Open the page fresh | No name anywhere. Three ways in: help right now, add people I trust, support someone | Pass |
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
| 7.12 | Not built yet | Tap **Add people I trust** and **I want to support someone** | "Coming soon", with a way back. No errors | Pass: "Coming soon" with Back to start |
| 7.13 | Demo sign-in | Tap **Demo: open as Gary** | "Hi Gary. How are you right now?" Name shown only now | Pass: "Hi Gary" only after demo sign-in |
| 7.14 | Start again | From services, tap **Start again** | Back to the welcome screen, with tonight's state cleared | Pass: back to welcome, summary cleared |
## 8. Sign-up, your people and check-in

From Joseph's sign-up (`signup.js`) and Carl's check-in (`checkin.js`). Run on 22 Oct by Anastasia with Claude, in a browser.

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 8.1 | Skip everything | **Add people I trust**, then **Skip** on every step | Ends "You're set up." with no name and "Nobody yet". No errors | Pass: "You're set up." and "Nobody yet". Home then says "Hi there." |
| 8.2 | Made-up name | On the name step, tap **Give me a made-up name** | A clearly made-up name (for example "Calm Otter") is used from then on | Pass: "Kind River". But see 8.16 |
| 8.3 | Escape hatch on every step | Look for **Talk to someone now, no name needed** on each sign-up step | It's on every step, and goes to help right now | Partly: on every step except "We've asked Lorraine" (only demo buttons there) |
| 8.4 | Add a person, they say yes | Add Lorraine. Demo: she says yes | Shows exactly what Lorraine sees. Then she's in "Your people" | Pass: shows Lorraine's text, then she's in Your people |
| 8.5 | They say no | Add Mick. Demo: he says no | Kind words ("That's OK"). Mick is **not** added, and can't be messaged | Pass: kind words, and Mick isn't added |
| 8.6 | Person with no name | On the people step, add with the name blank | Clear error next to the field, focus moves there | Pass: error linked to the field, focus moves there |
| 8.7 | Three-person limit | Add 3 people | It says that's plenty. No way to add a 4th | Pass: "That's 3 people, which is plenty". The form disappears |
| 8.8 | Remove someone | In Your people, remove Lorraine | "Lorraine has been removed. We won't tell them." She's no longer offered in "Send this to…" | Pass, once there. **But there's no button to reach Your people** after sign-up (see 8.17) |
| 8.9 | Change the message | In Your people, change the message, then go to **I need someone** | The new message is the one shown before sending | Pass: new message shown in "Send this to Sam?" |
| 8.10 | Check-in, no reply | Set a check-in. Demo: skip to the time, then no reply twice | Texts once, nudges once, then tells only the chosen people that he didn't reply. Nothing else | Pass: text at 11pm, one nudge, then "We've let Sam know… We didn't tell them anything else" |
| 8.11 | Check-in, nobody chosen | Set a check-in with **Nobody. Just remind me again** | After no reply, nobody is told | Pass: "We haven't told anyone" |
| 8.12 | Check-in, needs someone | Reply **I need someone** to the check-in text | Hands over to "Send this to Lorraine?" and asks first | Pass: goes to "Send this to Sam?" and asks first |
| 8.13 | Check-in after midnight | Set the check-in for 00:00 or 01:00 | Times read correctly ("12am", "1am"), and "tomorrow" means the right day | Partly: "midnight" and "1am" read well. But after a 1am check-in it says "again **tomorrow** at 1am", which could mean the wrong night |
| 8.14 | Only agreed people offered | Have one person say no. Open check-in set-up | Only people who said yes are listed | Pass: removed and declined people aren't listed |
| 8.15 | Words | Read every new screen | Short, kind, no jargon. The demo button says "pretend he didn't reply": use "you" or "they" | **Fixed** (Anastasia, approved by the squad): now "Demo: pretend they didn't reply". Re-tested: pass |
| 8.16 | Made-up name in messages to trusted people | Sign up with a made-up name. Add Lorraine | Lorraine can tell who's asking | **Fail:** Lorraine is asked by "Kind River" and later gets "Hi, it's Kind River". She won't know it's Gary. Suggest a separate "name your people know you by" |
| 8.17 | Reach Your people after sign-up | Signed up, look for a way to see or change your people | A button on the home screen | **Fixed** (Anastasia, approved by the squad): a **Your people** button on the "Hi Gary" screen opens Your people. Re-tested: pass |
| 8.18 | Check-in options tap size | Measure each time and wait option | At least 44 pixels tall | Partly: 39 pixels. Passes the 24-pixel minimum, under the 44 we're aiming for |
## 9. Supporter sign-up

Patricia's journey (`supporter.js`) isn't in the shared copy yet. Add scenarios when it lands: consent first, vetting shown as a step, family versus volunteer routes.

## 10. Who would you like to reach, night mode, meetings and the supporter journey

Run on 22 Oct by Anastasia with Claude, in a browser. New since the last run: Joseph's "Who would you like to reach?", Patricia's night mode and supporter journey, Spencer's real recovery meetings.

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 10.1 | Choose more than one person | As Gary: **I need someone**, **Choose someone else**, tick Lorraine and Mick, send | "Send this to Lorraine and Mick?" Both listed under "Who's been told" | Pass: "Send this to Lorraine and Mick?", both in "Who's been told" |
| 10.2 | Choose nobody, then send | Untick everyone and press send | Clear error, focus moves to the first tick box. Nothing sent | Pass: "Tick at least one person, or choose another option below", focus on the first box |
| 10.3 | Choose a volunteer instead | Pick the volunteer option | "Jo is calling you" at the top, then services. Jo in "Who's been told" | Pass: "Sam will call you soon" at the top, Sam in "Who's been told" |
| 10.4 | Choose nobody at all | Pick **nobody** | Back home. Nothing sent | Pass: "Nobody right now" goes home, nothing sent |
| 10.5 | Volunteer on after midnight | Set the demo time to Sunday 01:00 | A volunteer whose shift runs to 2am is still offered | Pass: Jo (on until 2am) offered at Sunday 1am. **But services still vanish after midnight** (7.11) |
| 10.6 | Night mode by default | Open the app fresh | Night colours. Text contrast at least 4.5:1 | Pass: night by default, all text at least 4.5:1 (measured) |
| 10.7 | Switch to light mode | Press the mode button | Light colours. The button's name and state agree (a screen reader isn't told the opposite) | **Fail:** in night mode the button says "Light mode" and is marked *pressed*, so a screen reader hears "Light mode, selected", the opposite of what's on. Fix: keep one label ("Dark mode") with pressed on/off, or drop "pressed" |
| 10.8 | Remembers the choice | Switch mode, reload | Same mode as before | Pass: choice saved on this phone ("alex-theme") |
| 10.9 | Recovery meetings | Go to services open now | Real meetings shown, with when they were checked. Links open in a new tab | Pass: real NA, AA and CA meetings, "checked on 22 October 2026", links open in a new tab |
| 10.10 | Supporter: family, invited | **I want to support someone**, Someone I know, Someone asked me. Fill in. Say yes | Consent first. Shows the text they got. Ends "You're Lorraine's supporter" (or whoever asked) | Pass: consent first, shows Gary's text, ends "You're Gary's supporter" |
| 10.11 | Supporter: offer, person says no | Someone I know, I'd like to offer. Demo: they say no | Kind words, "not about you", nothing saved | Pass: "That's their choice, and it's not about you", plus support for families |
| 10.12 | Supporter: volunteer | Anyone who needs someone. Pick nights and times | Vetting shown as a step. Ends with the nights and times chosen | Pass: vetting shown ("Not built in this demo"), ends with the nights chosen |
| 10.13 | Volunteer with no nights | Pick no nights, continue | Clear error, focus moves there | Pass: "Pick at least one night", focus on Monday |
| 10.14 | Volunteer times the wrong way round | From 11pm until 11pm | It asks for a later finish (or accepts it, if agreed) | **Fail:** accepts "11pm to 11pm" and says "on Saturday, 11pm to 11pm" |
| 10.15 | Supporter form errors | Leave first name and phone blank | Both errors shown and linked to the fields | Partly: only the first error ("Enter your first name") shows, not the phone one too |
| 10.16 | Stop and delete | At the end, **Stop being a supporter** and **Delete my details** | Clear confirmation. Nothing kept | Pass: "Your details have been deleted" |
| 10.17 | Not now | On "Before you start", press **Not now** | "Nothing has been saved", with a way back | Pass: "Nothing has been saved", Back to start |
| 10.18 | Focus ring on tick boxes, light mode | Light mode. Tab to a tick box in "Who would you like to reach?" or check-in | Ring visible, at least 3:1 | **Fail:** tick boxes still use the pale yellow ring: 1.02:1 on the light background, invisible. Buttons and links now get a dark ring (5.8 fixed for those) |

## Re-check of earlier findings (22 Oct, latest version)

| # | Finding | Now |
|---|---|---|
| 5.8 | Faint focus ring | **Mostly fixed:** dark ring on buttons and links in light mode, yellow on night (10:1). Tick boxes still faint (10.18) |
| 8.16 | Made-up name in messages to trusted people | **Fixed** by Joseph: sign-up asks for a name your people know you by |
| 8.15, 8.17 | "he didn't reply"; no way to reach Your people | **Fixed** (Anastasia) |
| 7.11 | Services vanish after midnight | **Still open.** Volunteers now handle midnight correctly, services don't |
| 5.10 | Same page title on every screen | **Still open:** "Alex" everywhere |
| 5.13 | No Esc for quick exit | **Still open** |
| 7.2 | "Jo is a volunteer supporter… Volunteer supporter." | **Still open** (`data/people.js`) |
| 7.6 | "abc" accepted as a phone number | **Still open** (squad to decide) |
| 8.13 | "again tomorrow at 1am" | **Still open** |

## 11. Demo check before show and tell (about 18:30)

Quick checks on the latest version, run by Anastasia with Claude, in a browser.

| # | Scenario | Steps | Expected result | Outcome |
|---|---|---|---|---|
| 11.1 | Help right now, end to end | **I need help right now**, yes to a call, pretend number | Volunteer card, then "will call you soon" | Pass: Sam's card with an "S" avatar, "on until 3am", then "Sam will call you soon" |
| 11.2 | Gary needs someone | Demo as Gary, **I need someone** | Choose who to reach | Pass: "Who would you like to reach?" with Lorraine, Mick, Sam, services and nobody |
| 11.3 | Waiting for a yes | Add trusted people, don't answer for one | Status in words, not just colour | Pass: "waiting for a yes" and "said yes" next to each person |
| 11.4 | Same person added twice | Add Lorraine three times | Stopped, or a warning | **Fail (small):** Lorraine is added three times |
| 11.5 | Pretend phone: call menu | `phone.html`, **Call**, wait, press 2 then 3 | Menu read out, then what's open, then meetings | Pass. Keys pressed while "Connecting…" are ignored with no sign, so wait for the menu |
| 11.6 | Pretend phone: meetings tonight | Press 3 at 11:10pm | Only meetings still to come tonight | **Fail (small):** lists the NA meeting at 7:30pm, which has finished |
| 11.7 | Pretend phone: text in your own words | **Text**, type "help me" | Treated like HELP | **Fail:** "Sorry, I didn't get that". Only the exact word works. Someone struggling is likely to type naturally |
| 11.8 | Pretend phone: text HELP | Tap **HELP** | Menu of replies | Pass: CALL, OPEN, MEET, STOP, plus the 999 line |
