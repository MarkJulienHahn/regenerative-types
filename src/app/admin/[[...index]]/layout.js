export const metadata = {
  title: "Backend | Regenerative Typologies",
  description: "Welcome to the Backend of Regenerative Typologies",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <div className="admin-layout">{children}</div>
      </body>
    </html>
  );
}
