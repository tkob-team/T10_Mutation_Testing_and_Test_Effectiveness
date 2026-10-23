<!-- Source: T10_Mutation_Testing_Slides.pdf. Converted in original page order. Charts/tables are represented in Markdown; decorative photos are omitted from this text-only version. -->

# Mutation Testing and Test Effectiveness

*Seminar · EShop Case Study · Group 12*

## Slide 01 — Cover

**Seminar:** Mutation Testing and Test Effectiveness

**Presenters**

| Student ID | Name |
|---|---|
| 23120255 | Lê Tấn Hiệp |
| 23120262 | Tống Dương Thái Hòa |
| 23120264 | Nguyễn Phúc Hoàng |

---

## Slide 02 — The Question

*T10 / THE QUESTION · 01/12*

### All tests passed. So... no bugs?

**ALL TESTS: PASS**

**Does PASS mean the code is correct?**

> Question: Can tests catch wrong results?

---

## Slide 03 — The Problem

*T10 / THE PROBLEM · 02/12*

### Running code ≠ checking the result.

| Code Coverage | Mutation Testing |
|---|---|
| Did we visit this code? | Did we notice a wrong result? |
| ✓ **YES** | ? **NOT ALWAYS** |

> A test can run the right code and still miss the wrong answer.

---

## Slide 04 — One Simple Example

*T10 / ONE SIMPLE EXAMPLE · 03/12*

### One character can change the answer.

| Original rule | Changed rule (mutant) |
|---|---|
| `amount >= 100` | `amount > 100` |

**Test the exact boundary:** `amount = 100`

| Input | Original rule | Changed rule |
|---|---|---|
| `100` | ✓ YES | × NO |

> The mutant is visible only when the input exposes its difference.

*The original slide uses the `≥` symbol for the original rule.*

---

## Slide 05 — The Method

*T10 / THE METHOD · 04/12*

### Stryker makes mistakes. Tests hunt them.

| Step | Action | Description |
|---|---|---|
| 01 | **START** | Good code |
| 02 | **MUTATE** | Change one thing |
| 03 | **RETEST** | Run same tests |
| 04 | **DECIDE** | Read result |

| Outcome | Meaning |
|---|---|
| ✓ **KILLED** | A test fails on the changed code. |
| × **SURVIVED** | The tests still pass. |

> A SURVIVOR is a clue to investigate, not proof of a bug.

---

## Slide 06 — Our Real Case Study

*T10 / OUR REAL CASE STUDY · 05/12*

### We tested an online shop backend.

**Starting point: 88 passing tests**

| Test area | Passing tests | Scope |
|---|---:|---|
| Cart & Orders | 36 | Add items and place orders |
| Coupons | 26 | Discount and usage limits |
| Accounts | 26 | Login and access |
| **Total** | **88** | |

> First we wrote passing tests. Then Stryker tested those tests.

---

## Slide 07 — Why These Tools

*T10 / WHY THESE TOOLS · 06/12*

### Two helpers. Different jobs. Humans decide.

| StrykerJS | AI Assistant | Human Review |
|---|---|---|
| **Find weak tests** | **Suggest improvements** | **Check what is right** |
| Create mutants | Propose assertions | Read requirements |
| Run tests | Explain candidates | Accept or reject |
| Show survivors | May be wrong | Verify by running |

> Why StrykerJS? Our EShop uses JavaScript. PIT targets Java; mutmut targets Python.

---

## Slide 08 — EShop Finding 01

*T10 / ESHOP FINDING 01 · 07/12*

### The new cart was not really empty.

**What the mutant did**

- Created a **NEW CART** containing **1 unexpected item**.
- It should contain **ZERO items**.

**What the test checked**

| When | Assertion |
|---|---|
| Before | “Request succeeded” |
| After | “Cart has 0 items” |

**Result:** `SURVIVED → KILLED`

> Key idea: “Success” does not mean the DATA is correct.

---

## Slide 09 — EShop Finding 02

*T10 / ESHOP FINDING 02 · 08/12*

### Better input reveals the hidden difference.

| Scenario | Expected saved value | Mutant's saved value | Outcome |
|---|---:|---:|---|
| Set usage limit = **1** | 1 | 1 | **NO DIFFERENCE** |
| Set usage limit = **3** | 3 | 1 | **MUTANT DETECTED** |

> Changing the input helped our tests detect **2 related mutants**.

---

## Slide 10 — Our Experiment

*T10 / OUR EXPERIMENT · 09/12*

### Same starting point. Different test improvements.

**SAME ORIGINAL CODE + BASELINE TESTS**

| Manual | AI-assisted |
|---|---|
| People add better checks. | AI suggests → human verify. |

**RUN TESTS AGAIN → COMPARE WHICH MUTANTS WERE KILLED**

---

## Slide 11 — Results on EShop

*T10 / RESULTS ON ESHOP · 10/12*

### More useful checks caught more changes.

**Cart & Orders**

| Test improvement | Number of mutants detected |
|---|---:|
| Starting tests | **82** |
| Manual | **105** |
| AI-assisted | **95** |

**Coupons**

| Test improvement | Number of mutants detected |
|---|---:|
| Start | **39** |
| Manual | **41** |
| AI-assisted | **41** |

**Auth:** comparison pending.

*The chart's metric is “Number of mutants detected”, not a percentage or mutation score.*

---

## Slide 12 — Important Limits

*T10 / IMPORTANT LIMITS · 11/12*

### A bigger score is not the whole truth.

**01 — TIMEOUT**

A slow test is not a proven bug catch.

**02 — WRONG RULE**

Tests can enforce bad expectations.

**03 — SURVIVOR**

It might be a missing test or equivalent.

> AI gives ideas. A passing test on the original + a verified mutant kill gives evidence.

---

## Slide 13 — Next: Live Demo

*T10 / NEXT: LIVE DEMO · 12/12*

### Now watch us hunt a mutant.

**SEE IT CHANGE.**

**WATCH THE TEST CATCH IT.**

**NEXT 10 MIN: REAL TERMINAL + ESHOP**

Afterward: your turn with **5 mutants**.

---

## Slide 14 — Closing

# THE END OF MY PRESENTATION

**ANY QUESTION BRUH?**
