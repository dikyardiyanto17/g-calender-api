import Table from "react-bootstrap/Table";

export default function Home() {
  return (
    <>
      <div  style={{ padding: "30px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Event</th>
              <th>Date</th>
              <th>Starting At</th>
              <th>Ended At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Hola</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
