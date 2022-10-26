type EventListenerProps = {
  eventData: any;
  setEvent: any;
};

/**
 * @TODO it won't work with multiple simultaneous events
 */
const EventListener = ({eventData, setEvent} : EventListenerProps) => {

    setInterval(() => {setEvent({title: '', event: {}, status: false})}, 3000)
    return (
        <div>
            {
               eventData.status && (
                <div>
                    <h2>Event: {eventData.title}</h2>
                    {eventData.data.name}, {eventData.data.author}
                </div>
               ) 
            }
        </div>
    );
};

export default EventListener;
