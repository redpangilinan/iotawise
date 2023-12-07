# Iotawise

Iotawise is an open-source habit tracking app that lets you track daily habits and monitor your activity streaks and progress with little effort.

![og image](/public/og.jpg)

## Features

- User-friendly Interface
- Habit/Activity Tracking
- Activity Streak Monitoring
- Dashboard Analytics
- Google Authentication
- Web Push Notifications (coming soon)
- Cross-platform Support (PWA)

## Stack

- [Next.js](https://nextjs.org) `/app` dir
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) Components
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://www.prisma.io) ORM
- [Zod](https://zod.dev) Validations
- [PlanetScale](https://planetscale.com) Database (MySQL)

## Running Locally

1. Clone the repository.

```bash
pnpm dlx degit redpangilinan/iotawise
```

2. Install dependencies using pnpm.

```bash
pnpm install
```

3. Copy `env.example` to `env.local` and update the variables.

```bash
cp .env.example .env.local
```

4. Generate prisma client before starting development server.

```bash
pnpm postinstall
```

5. Start the development server.

```bash
pnpm dev
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
