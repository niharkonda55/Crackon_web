export function AmbientBlobs() {
  return (
    <>
      <div
        className="ambient-blob ambient-blob--slow"
        style={{ width: 320, height: 320, top: "8%", left: "10%" }}
      />
      <div
        className="ambient-blob ambient-blob--medium"
        style={{ width: 260, height: 260, bottom: "12%", right: "14%" }}
      />
      <div
        className="ambient-blob ambient-blob--fast"
        style={{ width: 220, height: 220, bottom: "18%", left: "35%" }}
      />
    </>
  );
}

