# Posts API with Cloud Image Storage (Cloudinary / ImageKit)

A backend API for creating, reading, updating, and deleting **posts**, where each post consists of a **caption** and an **image**. Images are uploaded to a cloud storage provider (Cloudinary or ImageKit), and only the resulting image URL is stored in MongoDB — keeping the database lightweight and letting the CDN handle image delivery.

---

## Features

- Upload post images to **Cloudinary** or **ImageKit**
- Store post data (`caption`, `imageUrl`, timestamps, etc.) in **MongoDB**
- Full CRUD support:
  - `POST` — Create a new post (upload image + save caption)
  - `GET` — Fetch all posts / a single post
  - `PUT` / `PATCH` — Update a post (caption and/or replace image from DB and cloud storage)
  - `DELETE` — Delete a post (and remove image from cloud storage)
- Clean separation between storage logic and database logic, so you can swap Cloudinary ↔ ImageKit easily

---

## Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Runtime        | Node.js                                  |
| Framework      | Express.js                               |
| Database       | MongoDB (Mongoose)                       |
| Image Storage  | Cloudinary **or** ImageKit               |
| File Handling  | Multer (for parsing multipart form-data) |


## How Image Upload Works

1. Client sends a `multipart/form-data` request with `caption` + `image` file.
2. **Multer** middleware parses the incoming file (stored temporarily in memory or `/tmp`).
3. The file buffer is uploaded to **Cloudinary** or **ImageKit** via their SDK.
4. The provider returns a hosted `url` and a unique `id` (`public_id` / `fileId`).
5. Only `caption`, `imageUrl`, and `imageId` are saved to MongoDB — the actual image binary never touches your database.

---
