# Customer Segmentation Dashboard

Modern Next.js 16 dashboard with TypeScript and Tailwind CSS for customer segmentation predictions.

## Features

- Interactive customer data input with sliders
- Real-time segment predictions
- Visual segment profiles with marketing strategies
- Responsive design with Tailwind CSS
- Type-safe with TypeScript

## Setup

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- REST API integration

## Components

- `SegmentationForm`: Input form with range sliders
- `ResultCard`: Display prediction results
- `SegmentsList`: Show all available segments

## API Integration

The dashboard connects to the FastAPI backend at `http://localhost:8000`

Make sure the API server is running before using the dashboard.
