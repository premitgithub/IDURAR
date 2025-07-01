import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';

import useLanguage from '@/locale/useLanguage';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  let { entity } = config;
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();

  /////

  const { panel, collapsedBox, readBox } = crudContextAction;

  const showCurrentRecord = () => {
    readBox.open();
  };

  /////
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    const id = current._id;

    // if (fieldsValue.file && withUpload) {
    //   fieldsValue.file = fieldsValue.file[0].originFileObj;
    // }
  /* -------------------------------------------------------------- */

    if (fieldsValue.documents) {
    fieldsValue.documents = fieldsValue.documents.map(file => file.name);
    }
  /* -------------------------------------------------------------- */

    // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //   return acc;
    // }, {});
    dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
  };
  useEffect(() => {
    if (current) {
      let newValues = { ...current };
    
    form.setFieldsValue(newValues);

    /* -------------------------------------------------------------- */

     // Convert uploaded file names into Ant Design Upload fileList format
    if (Array.isArray(newValues.documents)) {
      newValues.documents = newValues.documents.map((fileName, idx) => ({
        uid: `${idx}`,
        name: fileName,
        status: 'done',
        url: `/uploads/${fileName}`, // Make sure this matches your backend upload path
      }));
    }
    /* -------------------------------------------------------------- */
    
      if (newValues.birthday) {
        newValues = {
          ...newValues,
          birthday: dayjs(newValues['birthday']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.date) {
        newValues = {
          ...newValues,
          date: dayjs(newValues['date']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.expiredDate) {
        newValues = {
          ...newValues,
          expiredDate: dayjs(newValues['expiredDate']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.created) {
        newValues = {
          ...newValues,
          created: dayjs(newValues['created']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      if (newValues.updated) {
        newValues = {
          ...newValues,
          updated: dayjs(newValues['updated']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };
      }
      form.resetFields();
      form.setFieldsValue(newValues);
    }
  }, [current]);

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item
            style={{
              display: 'inline-block',
              paddingRight: '5px',
            }}
          >
            <Button type="primary" htmlType="submit">
              {translate('Save')}
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              paddingLeft: '5px',
            }}
          >
            <Button onClick={showCurrentRecord}>{translate('Cancel')}</Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}
