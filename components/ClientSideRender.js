import { useEffect, useState } from 'react';

export default function ClientSideRender(props) {
    const [client, setClient] = useState(false);

    useEffect(() => setClient(true), []);

    return <>{client && props.children}</>;
}
