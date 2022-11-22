import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css';
import * as yup from "yup";
import { Button, DatePicker, Form, Radio, Select, Input, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;


function App() {

  const schema = yup.object({
    firstName: yup.string().required('Please input your First Name!'),
    lastName: yup.string().required('Please input your Last Name!'),
    gender: yup.string().required('Please input your Gender!'),
    birthday: yup.date().required('Please input your Birthday!'),
    email: yup.string().required('Please input your Email!').email('Please input true Email!'),
    age: yup.number().required('Please input your Age!'),
  })
  const { handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // defaultValues: {
    //   firstName: 'Your first name',
    //   lastName: 'Your last name',
    //   email: 'Youremail@gmail.com',
    // },
    resolver: yupResolver(schema),
  });
  // console.log('error:', errors);
  const onSubmitForm = (data) => {
    console.log('data: ', { ...data, birthday: moment(data.birthday).format('DD/MM/YYYY') });
  }

  return (
    <div className="App" >
      <div className='App-header'>Form Donate</div>
      <Form onFinish={handleSubmit(onSubmitForm)}>

        {/* first name */}
        <Form.Item
          label='First Name'
        >
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => {
              // console.log(field);
              return (
                <Input {...field} status={errors.firstName && "error"} />
              )
            }}
          />
          {errors.firstName && <Text type="danger">{errors.firstName.message}</Text>}
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          label={'Last Name'}
        >
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => <Input {...field} status={errors.lastName && "error"} />}
          />
          {errors.lastName && <Text type="danger">{errors.lastName.message}</Text>}
        </Form.Item>

        {/* Gender */}
        <Form.Item
          label={'Gender'}
        >
          <Radio.Group>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => <Radio {...field} value='Male'>Male</Radio>}
            />
            <Controller
              name='gender'
              control={control}
              render={({ field }) => <Radio {...field} value='FeMale'>FeMale</Radio>}
            />
          </Radio.Group>
          {errors.gender && <Text type="danger">{errors.gender.message}</Text>}
        </Form.Item>

        {/* date */}
        <Form.Item label={'Born'}>
          <Controller
            name='birthday'
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
          {errors.birthday && <Text type="danger">{errors.birthday.message}</Text>}
        </Form.Item>

        {/* select */}
        <Form.Item label={'City'}>
          <Controller
            name='city'
            control={control}
            render={({ field }) => <Select {...field}
              options={[
                { value: "Ha Noi", label: "Ha Noi" },
                { value: "Ho Chi Minh", label: "Ho Chi Minh" },
                { value: "Da Nang", label: "Da Nang" }
              ]}
            />}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label='Email'
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => {
              // console.log(field);
              return (
                <Input {...field} status={errors.email && "error"} />
              )
            }}
          />
          {errors.email && <Text type="danger">{errors.email.message}</Text>}
        </Form.Item>

        {/* Age */}
        <Form.Item
          label='Age'
        >
          <Controller
            name='age'
            control={control}
            render={({ field }) => {
              // console.log(field);
              return (
                <Input {...field} status={errors.age && "error"} type='number' />
              )
            }}
          />
          {errors.age && <Text type="danger">{errors.age.message}</Text>}
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div >
  );
}

export default App;
