import React from 'react';
import { MdStore as icon } from 'react-icons/md';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar

const Sidebar = () =>
  S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(icon)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default Sidebar;
