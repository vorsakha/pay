# PAY

This single-page application demonstrates the use of the Mural Pay API to create and manage customer accounts and execute payments. The application allows a user to:

1. Customer & Account:
  Create a customer account
  View account details
1. Transfer Requests:
  Create a transfer request
  View transfer requests
  Execute transfer requests
  Cancel transfer requests

## Technologies
### Languages & Frameworks:

- TypeScript
- React
- Vite

### State & Data Fetching:

- React Query (@tanstack/react-query)

### Routing:

- React Router DOM

### Forms & Validation:

- React Hook Form
- Zod

### Styling & UI:

- Tailwind CSS
- Shadcn UI Components
- Lucide Icons

### Utilities:

- Axios
- React Window (for virtualized lists)

## Setup & Installation

1. Clone the repository:

```bash
git clone git@github.com:vorsakha/pay.git
cd pay
```

2. Install dependencies:

```bash
npm install
```

3. Configure the API URLs and tokens in the `.env` file:

```bash
cp .env.example .env
```

4. Start the development server:
  
```bash
npm run dev
```