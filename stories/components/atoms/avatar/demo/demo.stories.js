import { Avatar } from '../component/avatar';
import { avatarDefaultConfigs } from '../../../../configs';


export default {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'text',
      description: 'Sets size of the avatar.',
      table: {
        defaultValue: {
          summary: avatarDefaultConfigs.size
        },
        type: {
          summary: 'string'
        },
      },
      type: {
        required: true
      }
    },
    shape: {
      control: 'radio',
      options: ['square', 'round', 'hexagon'],
      description: 'Changes the shape of the avatar.',
      table: {
        defaultValue: {
          summary: avatarDefaultConfigs.shape
        },
        type: {
          summary: 'radio'
        }
      }
    },
    src: {
      control: 'text',
      description: 'Changes the source of the avatar image.',
      table: {
        type: {
          summary: 'string'
        }
      }
    }
  }
};

const Template = ({...args}) => {
  return Avatar({...args});
};

export const Demo = Template.bind({});
Demo.args = avatarDefaultConfigs;
