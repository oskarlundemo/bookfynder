# Bookfynder

**Bookfynder** is a full-stack web application that helps readers discover new books through personalized recommendations. The platform allows users to track their reading activity and receive AI-generated suggestions based on their interests and reading history.

## Overview

As someone who enjoys reading, I often found myself spending a significant amount of time searching for new books that matched my preferences. While there are many recommendation platforms available, they often lack personalization or require extensive manual searching.

Bookfynder was built to streamline this process.

Users can track books they are currently reading, want to read, or have already completed. Based on this data, the application generates personalized recommendations using the OpenAI API. Recommended books are presented in an interactive swipe interface, allowing users to quickly browse suggestions in a simple and engaging way.

## Features

- Track books you are **currently reading**, **want to read**, or **have finished**
- AI-generated book recommendations based on your reading preferences
- Swipe-based recommendation interface inspired by modern discovery apps
- Clean and modern user interface
- Persistent user data and reading lists

## Tech Stack

**Frontend**

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**

- Supabase
- Prisma
- PostgreSQL

**AI Integration**

- OpenAI API for generating personalized book recommendations

## Architecture

- **Next.js** provides the full-stack application framework.
- **Supabase** manages authentication and backend services.
- **PostgreSQL** serves as the primary database.
- **Prisma** acts as the ORM for database interaction.
- **OpenAI** generates recommendations based on user reading preferences.

## Lessons Learned

- Gained a deeper understanding of **Next.js Server and Client Components** and when to use each for performance and data handling.
- Learned how to structure a full-stack application using **Next.js, Supabase, and Prisma**.
- Improved my experience integrating **AI APIs** into a real-world application workflow.
- Developed a better approach to building **clean, scalable UI components** using Tailwind CSS and shadcn/ui.
