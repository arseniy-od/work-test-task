import './App.css';
import Table from 'react-bootstrap/esm/Table';
import users from './db/users.json';
import Container from 'react-bootstrap/esm/Container';
import UserRow from './components/UserRow';
import TimesheetModal from './components/TimesheetModal';

export default function App() {
    return (
        <div className="App h-screen">
            <div className="m-xxl-5" style={{textAlign: 'left'}}>
                <Container className="" fluid>
                    <div className='shadow-lg' style={{borderRadius: '6px', overflowX: 'scroll'}}>
                    <Table className='table-light' hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Manager</th>
                                <th>Position</th>
                                <th>Timesheets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <UserRow user={user} />
                            ))}
                        </tbody>
                    </Table>
                    </div>
                    <TimesheetModal />
                </Container>
            </div>
        </div>
    );
}
