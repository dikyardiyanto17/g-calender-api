export default function TableEvents({ index, event }) {

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{event.NamaKegiatan}</td>
        <td>{event.Tanggal}</td>
        <td>{event.JamMulai}</td>
        <td>{event.JamSelesai}</td>
        <td>{event.status}</td>
      </tr>
    </>
  );
}
