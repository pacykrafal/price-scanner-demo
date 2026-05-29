export default function SearchPage() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Price Scanner</h1>
      <p>System monitorowania cen produktów.</p>

      <input
        placeholder="Szukaj produktu, SKU lub EAN..."
        style={{
          marginTop: 24,
          padding: 14,
          width: "100%",
          maxWidth: 520,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />
    </main>
  );
}