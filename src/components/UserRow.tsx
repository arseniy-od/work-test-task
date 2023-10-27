import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/Image';
import users from '../db/users.json';
import {useWorker} from '../hooks/useWorker';

type Users = typeof users;

type UserRowProps = {
    user: Users[number];
};

export default function UserRow({user}: UserRowProps) {
    const {changeWorkerId} = useWorker();
    return (
        <tr>
            <td>
                <div
                    className="d-flex justify-content-start gap-2"
                    style={{backgroundSize: 'cover'}}>
                    <div
                        style={{
                            width: 50,
                            height: 50,
                        }}>
                        {/* images look pixelated, because original size is too large for a thumbnail. 
                                            It`s recommended to create separate thumbnail on backend when uploading avatar. 
                                            It also strongly affects performance */}
                        <Image
                            className="img-thumbnail"
                            src={user.avatar.link}
                            alt="avatar"
                            roundedCircle
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div>
                        <div className="text-left">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-black-50">{user.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="text-secondary">{user.phone}</div>
            </td>
            <td>
                <div
                    className="text-secondary text-truncate"
                    style={{maxWidth: 200}}>
                    {user.department.title}
                </div>
            </td>
            <td>
                {user.manager && (
                    <div className="d-flex justify-content-start gap-2">
                        <Image
                            className="img-thumbnail"
                            src={
                                user.manager?.avatar?.link
                                    ? user.manager?.avatar?.link
                                    : './default_avatar.png'
                            }
                            alt="avatar"
                            roundedCircle
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                            }}
                        />
                        <div className="">
                            <div className="flex justify-content-start">
                                <div className="">
                                    {user.manager.firstName}{' '}
                                    {user.manager.lastName}
                                </div>
                            </div>
                            <div
                                className="text-black-50 max-w-xl-75 text-truncate"
                                // style={{maxWidth: 265}}
                            >
                                {user.manager.email}
                            </div>
                        </div>
                    </div>
                )}
            </td>
            <td>
                <div className="text-secondary">{user.position}</div>
            </td>
            <td>
                <Button onClick={() => changeWorkerId(user.id)} style={{width: 65}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        className=''
                        fill="#ffffff"
                        viewBox="0 0 576 512">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                    </svg>
                </Button>
            </td>
        </tr>
    );
}
