import React from 'react';

export const EventsLog: React.FC<any> = ({ events, showDataClick }) => {
  const eventsLog: any[] = events.map((e: any) => {
    const time = e.date.toLocaleTimeString();
    const milliseconds = e.date.getMilliseconds();
    return {
      data: `${JSON.stringify(e.data, (key, val) => {
        if (typeof val === 'function') {
          return `(${val})`; // make it a string, surround it by parenthesis to ensure we can revive it as an anonymous function
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
    <div className='events'>{eventsLog.map((e: any, i: number) =>
      (
        <div key={i}>
            <span className={`type ${e.type.startsWith('MY_') ? 'custom' : ''}`}>{e.type}</span> {
              e.showData ? <pre className='data'>{e.data}</pre>
              : <span style={{textDecoration: 'underline', textDecorationStyle: 'dotted'}} onClick={() => {showDataClick(e); }}>show data</span>
            } <span className='time'>({e.time}<span className='milliseconds'>:{e.milliseconds}</span>)</span>
        </div>
      ))}
    </div>
  );
};
