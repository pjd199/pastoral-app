import { useCallback, useEffect, useReducer, useState } from 'react';

/**
 * Render the NoteList Compment
 * @param  {} props
 */
export default function NoteList(props) {
    // props - database, sortBy, search
    const [data, setData] = useState(null);
    const [revision, increamentRevision] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        if (!props.database) return;
        var changes = props.database
            .changes({
                since: 'now',
                live: true,
            })
            .on('change', increamentRevision)
            .on('error', console.error);

        return () => changes.cancel();
    }, [props.database]);

    useEffect(() => {
        if (!props.database) return;
        const searchDatabase = async () => {
            var results = await props.database
                .find({
                    selector: { title: { $regex: props.search } },
                    fields: ['_id', 'title', 'text', 'time'],
                    sort: [props.sortBy],
                })
                .then(function (result) {
                    return result.docs;
                });
            setData(results);
        };
        searchDatabase().catch(console.error);
    }, [props.database, props.search, props.sortBy, revision]);

    var content;
    if (!data) content = <p>Loading...</p>;
    else if (data.length == 0) content = <p>No items to display</p>;
    else
        content = (
            <ul>
                {data.map((row) => (
                    <li key={row._id}>
                        <b>{row.title}</b> {row.text} (
                        {new Date(row.time).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        );

    return (
        <div>
            <b>Notes Data</b>
            {!data && <p>Loading...</p>}
            {data && !data.length && <p>No items to display</p>}
            {data && data.length && (
                <ul>
                    {data.map((row) => (
                        <li key={row._id}>
                            <b>{row.title}</b> {row.text} (
                            {new Date(row.time).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
