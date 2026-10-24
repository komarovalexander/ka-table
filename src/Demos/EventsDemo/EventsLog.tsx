import React from 'react';

// an action which the table dispatched
export interface TableEvent {
    data: unknown;
    date: Date;
    showData: boolean;
    type: string;
}

interface IEventsLogProps {
    clearLog: () => void;
    events: TableEvent[];
    showDataClick: (event: { date: Date }) => void;
}

export const EventsLog: React.FC<IEventsLogProps> = ({ events, showDataClick, clearLog }) => {
    const eventsLog = events.map((e) => {
        const time = e.date.toLocaleTimeString();
        const milliseconds = e.date.getMilliseconds();
        return {
            data: `${JSON.stringify(e.data, (key, val) => {
                if (typeof val === 'function') {
                    return `(${val})`;
                }
                if (key === 'trRef') {
                    return '';
                }
                return val;
            }, 2)}`,
            date: e.date,
            milliseconds,
            showData: e.showData,
            time,
            type: e.type,
        };
    });
    return (
        <>
            <button className='events-clear' onClick={clearLog}>Clear log</button>
            <div className='events'>{eventsLog.map((e, i) =>
                (
                    <div key={i}>
                        <span className={`type ${e.type.startsWith('MY_') ? 'custom' : ''}`}>{e.type}</span> {
                            e.showData ? <pre className='data'>{e.data}</pre>
                                : <span style={{textDecoration: 'underline', textDecorationStyle: 'dotted'}} onClick={() => {showDataClick(e); }}>show data</span>
                        } <span className='time'>({e.time}<span className='milliseconds'>:{e.milliseconds}</span>)</span>
                    </div>
                ))}
            </div>
        </>
    );
};
