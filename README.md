# Swappify

## 📝 Problem Statement
Develop a **Skill Swap Platform** — a mini application that enables users to **list their skills** and **request others in return**. This platform aims to foster a community of mutual learning and collaboration by matching users based on the skills they can offer and the skills they seek.

---

## 🧑‍🤝‍🧑 Team Members

| Name              | Email Address               |
|-------------------|-----------------------------|
| Swara             | swara.mandale7@gmail.com    |
| Surabhi           | sahusurabhi02@gmail.com        |
| Veerta            | veertavikramshrivastava@gmail.com         |
| Soha              | sohaghodeswar@gmail.com        |

## 🧠 Why Skill Swap?

Millions of people want to learn new skills but can’t afford expensive courses or coaching.

> This platform connects people who can **trade knowledge** — no money, no barriers.

- 🎓 A student who knows Python can learn digital marketing
- 🎨 A graphic designer can learn SEO from a content creator
- 🧑‍🏫 A teacher can offer spoken English in return for website building

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🧑‍💼 **Public/Private Profiles** | Set availability, skills offered/wanted |
| 🔍 **Skill Search** | Find people by skill keywords |
| 🔁 **Request Swaps** | Send/accept/reject/delete swap offers |
| 🛡️ **Admin Tools** | Moderate users and send platform-wide messages |
| 📊 **Analytics Dashboard** | Live stats on users, swaps, feedback |
| 🌗 **Responsive + Accessible UI** | Tailwind-powered, light/dark mode ready |

---

## 📷 Screenshots

<table>
<tr>
<td>🔐 Sign In</td>
<td>📝 Edit Profile</td>
</tr>
<tr>
<td><img src="https://user-images.githubusercontent.com/placeholder/signin.png" width="400"/></td>
<td><img src="https://user-images.githubusercontent.com/placeholder/edit.png" width="400"/></td>
</tr>
<tr>
<td>🔍 Skill Search</td>
<td>📊 Admin Dashboard</td>
</tr>
<tr>
<td><img src="https://user-images.githubusercontent.com/placeholder/search.png" width="400"/></td>
<td><img src="https://user-images.githubusercontent.com/placeholder/admin.png" width="400"/></td>
</tr>
</table>

---

## ⚙️ Tech Stack

| Category     | Stack                        |
|--------------|------------------------------|
| Frontend     | React + Next.js (TypeScript) |
| Styling      | Tailwind CSS                 |
| Auth         | Firebase Auth + NextAuth     |
| Database     | Firestore                    |
| Hosting      | Vercel                       |
| Realtime     | Firestore onSnapshot         |

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/your-username/skill-swap-platform
cd skill-swap-platform
npm install
```

Then add `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
...
```

```bash
npm run dev
```

➡️ Visit `http://localhost:3000`

---

## 🧩 Folder Structure

```
skill-swap-platform/
├── client/
│   ├── components/   # UI Components
│   ├── pages/        # Next.js Routes
│   └── styles/       # Tailwind CSS
├── server/
│   └── firebase.ts   # Firebase config
└── public/           # Static assets
```

---

## 🚀 Hackathon Pitch Value

This project is:
- 💡 Unique idea with real-world impact
- 💼 Ready for production (hosted, secure, scalable)
- 💬 Easy to pitch: “Skill bartering instead of money”
- 🧠 Uses emerging tech (Realtime DB, Firebase, Tailwind)
- 🧪 MVP polished for 3-minute demo

---

## 📈 Future Roadmap

- ✅ Real-time swap chat
- ✅ Skill rating system after swap
- ⏳ AI suggestions: “People you can swap with”
- ⏳ Gamification: badges, streaks, swap score
- ⏳ Mobile app (React Native)

---

## 🧠 Inspiration

Inspired by communities that exchange skills informally — this app formalizes and democratizes that process for everyone, everywhere.

---

## 🙋 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT © 2025 Skill Swap Team

