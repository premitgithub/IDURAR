import {Select} from 'antd';
import UserForm from '@/forms/UserForm';
import { useLayoutEffect, useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CreateForm from '@/components/CreateForm';
import UpdateForm from '@/components/UpdateForm';
import DeleteModal from '@/components/DeleteModal';
import ReadItem from '@/components/ReadItem';
import SearchItem from '@/components/SearchItem';
import DataTable from '@/components/DataTable/DataTable';

import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentItem } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';

import { CrudLayout } from '@/layout';

function SidePanelTopContent({ config, formElements, withUpload }) {
  const translate = useLanguage();
  const { crudContextAction, state } = useCrudContext();
  const { deleteModalLabels } = config;
  const { modal, editBox } = crudContextAction;

  const { isReadBoxOpen, isEditBoxOpen } = state;
  const { result: currentItem } = useSelector(selectCurrentItem);
  const dispatch = useDispatch();

  const [labels, setLabels] = useState('');
  useEffect(() => {
    if (currentItem) {
      const currentlabels = deleteModalLabels.map((x) => currentItem[x]).join(' ');

      setLabels(currentlabels);
    }
  }, [currentItem]);

  const removeItem = () => {
    dispatch(crud.currentAction({ actionType: 'delete', data: currentItem }));
    modal.open();
  };
  const editItem = () => {
    dispatch(crud.currentAction({ actionType: 'update', data: currentItem }));
    editBox.open();
  };

  const show = isReadBoxOpen || isEditBoxOpen ? { opacity: 1 } : { opacity: 0 };
  return (
    <>
      <Row style={show} gutter={(24, 24)}>
        <Col span={10}>
          <p style={{ marginBottom: '10px' }}>{labels}</p>
        </Col>
        <Col span={14}>
          <Button
            onClick={removeItem}
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '5px', marginTop: '10px' }}
          >
            {translate('remove')}
          </Button>
          <Button
            onClick={editItem}
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '0px', marginTop: '10px' }}
          >
            {translate('edit')}
          </Button>
        </Col>

        <Col span={24}>
          <div className="line"></div>
        </Col>
        <div className="space10"></div>
      </Row>
      <ReadItem config={config} />
      <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
    </>
  );
}

//setRole was dynamically added
function FixHeaderPanel({ config,setRole }) {
  const { crudContextAction } = useCrudContext();// crudContextAction -> custom hook for managing CRUD UI operations
  const { collapsedBox } = crudContextAction;

  const addNewItem = () => {
    collapsedBox.close();
  };

  return (
    <Row gutter={8}>
      <Col className="gutter-row" span={15}>
        <SearchItem config={config} />
      </Col>
      {/* -------------------------------------------------------------- */}
       {/*added section for adding the role on the top bar for dynamic form modification*/}
      <Col className="gutter-row" span={6}>
        <Select
          defaultValue="Student"
          style={{ width: '100%' }}
          onChange={(value) => setRole(value)}
        >
          <Select.Option value="Student">Student</Select.Option>
          <Select.Option value="Faculty">Faculty</Select.Option>
          <Select.Option value="COE">COE</Select.Option>
          <Select.Option value="Finance">Finance</Select.Option>
        </Select>
      </Col>
      {/* -------------------------------------------------------------- */}

      <Col className="gutter-row" span={3}>
        <Button onClick={addNewItem} block={true} icon={<PlusOutlined />}></Button>
      </Col>
    </Row>
  );
}

function CrudModule({ config, createForm, updateForm, withUpload = false }) {
  //config: objects containing metadata like entity name, search fields labels
  const dispatch = useDispatch();//gives access to Redux dispatch function to send actions
  /* ------------------------------------ */
  const [role,setRole] = useState('Student');
 /* ------------------------------------ */

  useLayoutEffect(() => {
    dispatch(crud.resetState());//resets any previous CRUD state
  }, []);
  /* ------------------------------------ */
  const updatedConfig = { ...config, selectedRole: role }; // Prepare updated config
  //We need to pass the selected role to multiple sub-components (FixHeaderPanel, UserForm, CreateForm, etc.)
 //But we don't want to pass multiple separate props like config and role separately everywhere
//So, we merge the role into the config once and pass that single object (updatedConfig) down
  /* ------------------------------------ */

  return (
    <CrudLayout
    /* -------------------------------------------------------------------------------------------------------- */
      config={updatedConfig}
      fixHeaderPanel={<FixHeaderPanel config={updatedConfig} setRole={setRole}/>}
    
      sidePanelBottomContent={
        <CreateForm config={updatedConfig} formElements={<UserForm role={role}/>} withUpload={withUpload} />
      }
      sidePanelTopContent={
        <SidePanelTopContent config={updatedConfig} formElements={<UserForm role={role}/>} withUpload={withUpload} />
      }
    >
      <DataTable config={updatedConfig} />
      <DeleteModal config={updatedConfig} />
    </CrudLayout>
    /* ----------------------------------------------------------------------------------------------------- */
  );
}

export default CrudModule;
