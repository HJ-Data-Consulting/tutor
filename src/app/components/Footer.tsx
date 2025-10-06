export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="border-t border-gray-300"></div>
      <div className="text-center py-4">
        <p className="text-sm text-gray-600">
          Copyright © {currentYear} HJ Data
        </p>
      </div>
    </footer>
  );
}
