import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

const itemToString = item => (item || '');
const bhadva = () => { console.log('bhadkhau'); };

const Typeahead = ({
  input, meta, placeholder, items, ...rest
}) => (
  <Downshift
    {...input}
    onInputValueChange={(inputValue) => {
      input.onChange(inputValue);
    }}
  onChange={(selection) => { input.value += <span className="tag is-light">{selection}</span>; }}
    itemToString={itemToString}
    selectedItem={input.value}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => {
      const filteredItems = matchSorter(items, inputValue, {
        keys: ['label'],
        maxRanking: matchSorter.rankings.STARTS_WITH,
      });
      return (
        <div className="downshift" style={{ position: 'relative' }}>
          <input
            {...getInputProps({
              name: input.name,
              placeholder,
            })}
          />
          {isOpen
            && !!filteredItems.length && (
              <div
                className="downshift-options"
                style={{
                  background: 'white',
                  position: 'absolute',
                  top: '100%',
                  left: 15,
                  right: 0,
                  zIndex: 4,
                }}
              >
                {filteredItems.map(({ value, label }, index) => (
                  <div
                    key={index}
                    {...getItemProps({
                      key: value,
                      onSelect: bhadva,
                      index,
                      item: value,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === value ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {label}
                  </div>
                ))}
              </div>
          )}
        </div>
      );
    }}
  </Downshift>
);
export default Typeahead;
