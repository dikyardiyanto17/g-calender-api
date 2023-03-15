import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../stores/actions/actionCreator";
import TableEvents from "../components/Table";

export default function Home() {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Event</th>
              <th>Date</th>
              <th>Starting At</th>
              <th>Ended At</th>
              <th>Status</th>
            </tr>
          </thead>
          {events && (
            <tbody>
              {events.map((theEvent, index) => {
                return (
                  <TableEvents key={index} event={theEvent} index={index} />
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    </>
  );
}
