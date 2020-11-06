import { MdStore as icon } from 'react-icons/md';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store name',
      type: 'string',
      description: 'Name of your store',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot slices billable in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
