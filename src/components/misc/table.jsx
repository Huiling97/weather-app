import isEmpty from 'lodash/isEmpty';
import Card from './card';
import { useContext } from 'react';
import { EntryContext } from '../../store/entryContext';

const Table = ({ entries, handleClick }) => {
  // const {entries} = useContext(EntryContext);

  const displayEntries = () => {
    return entries.map((entry, index) => (
      <Card
        key={`${entry.id}-${entry.time}-${index}`}
        entry={entry}
        handleClick={handleClick}
      />
    ));
  };

  return (
    <div className='table'>
      <div className='table__data'>
        {isEmpty(entries) ? (
          <>
            <p>No search history yet</p>
            <p>Start searching for some data!</p>
          </>
        ) : (
          <>
            <p className='table__header'>Search history</p>
            <div className='table__body'>{displayEntries(entries)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
