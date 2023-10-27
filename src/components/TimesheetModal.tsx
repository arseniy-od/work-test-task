import {ChangeEvent, useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {parseDate, getMonth, minutesToHours} from '../utils';
import {useWorker} from '../hooks/useWorker';
import Select from './Select';

import timesheets from '../db/timesheets.json';
import users from '../db/users.json';

type Users = typeof users;
type User = Users[number];

type Timesheets = typeof timesheets;
type Timesheet = Timesheets[number];

export default function TimesheetModal() {
    const {workerId, changeWorkerId} = useWorker();

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        if (e.target.value) {
            setFilter(month);
        } else {
            setFilter('');
        }
    };
    const [worker, setWorker] = useState<User>({} as User);
    const [timesheet, setTimesheet] = useState<Timesheet[]>([]);
    const [months, setMonths] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [filteredTimesheet, setFilteredTimesheet] = useState<Timesheet[]>([]);

    useEffect(() => {
        if (workerId) {
            const months: string[] = [];
            const currentTimesheets: Timesheet[] = timesheets.filter(item => {
                const month = getMonth(item.endTime);
                if (!months.includes(month)) {
                    months.push(month);
                }
                return item.userId === workerId;
            });
            const currentWorker = users.find(user => user.id === workerId);
            currentWorker && setWorker(currentWorker);
            setMonths(months);
            setFilter('')
            setTimesheet(currentTimesheets);
            setFilteredTimesheet(currentTimesheets);
        }
    }, [workerId]);

    useEffect(() => {
        if (filter) {
            const filtered = timesheet.filter(
                item => getMonth(item.endTime) === filter,
            );
            setFilteredTimesheet(filtered);
        } else {
            setFilteredTimesheet(timesheet);
        }
    }, [filter, timesheet]);

    return (
        <Modal
            show={!!workerId}
            size="xl"
            centered
            onHide={() => changeWorkerId('')}>
            <Modal.Header closeButton>
                <h2>Timesheet for {worker.firstName} {worker.lastName}</h2>
            </Modal.Header>
            <Modal.Body>
                <Select
                    options={months}
                    onChange={handleSelect}
                    defaultText="Select month"
                />
                <Table>
                    <thead>
                        <tr>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                            <th>Hours of work</th>
                            <th>Break</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTimesheet.map(timesheet => {
                            return (
                                <tr key={timesheet.id}>
                                    <td className="text-dark">
                                        {parseDate(timesheet.startTime)}
                                    </td>
                                    <td className="text-dark">
                                        {parseDate(timesheet.endTime)}
                                    </td>
                                    <td
                                        className={
                                            timesheet.status === 'approved'
                                                ? 'text-success'
                                                : 'text-black-50'
                                        }>
                                        {timesheet.status}
                                    </td>
                                    <td className="text-dark">
                                        {minutesToHours(timesheet.minutes)}
                                    </td>
                                    <td className="text-dark">
                                        {timesheet.breakMinutes} min
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}
