# Strategy Wheel

An interactive classroom tool that connects a lesson concept and target skill with a visible wheel of teaching strategies.

## How it works

1. Enter the concept or evidence set.
2. Select the skill students need to build.
3. Spin the wheel.
4. Review the selected strategy, activity possibilities, student move, and teacher challenge.
5. Generate and copy a visualization prompt when a visual representation would help.

The selector favors a direct skill match 80% of the time and uses a productive stretch strategy 20% of the time. Every strategy remains visible on the wheel so the class can see that learning can be approached in multiple ways.

## Files

- `index.html` — responsive wheel interface
- `strategies.json` — editable strategy catalog and activity possibilities
- `strategySelector.js` — selection, matching, and template hydration logic

## Add a strategy

Add another object to `strategies.json` using the existing fields:

```json
{
  "id": "guided-investigation",
  "name": "Guided Investigation",
  "category": "Inquiry & Experimentation",
  "cognitiveLevel": "Analyze",
  "skills": ["Analyze evidence", "Evaluate reliability"],
  "activityPossibilities": ["Paper Copter", "Pendulum Test", "Ramp Trial"],
  "setupTemplate": "Give students a focused question about {concept}.",
  "studentMoveTemplate": "Predict, test, measure, and revise.",
  "teacherChallengeTemplate": "Separate observation from inference.",
  "promptTemplate": "Create a visual investigation of {concept} for the skill {skill}."
}
```

## Run locally

Because the site loads `strategies.json`, serve the folder through a local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
