import RTEdit from './rtEdt'

export default function (args) {
  if (args.env.edit) {
    return <RTEdit {...args}/>
  }
}