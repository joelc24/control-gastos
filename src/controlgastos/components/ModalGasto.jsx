import PropTypes from 'prop-types';
import { Modal } from '@mantine/core'
import FormGasto from './FormGasto';
import { notifyInfo } from '../../helper/notify';
import { useControlGastoStore } from '../../hooks/useControlGastoStore';
import { useDispatch } from 'react-redux';
import { clearGastoActiveState, setSaving } from '../../store/controlgastos/controlgastoSlice';

const ModalGasto = ({title}) => {
    
    const { isSaving } = useControlGastoStore()
    const dispatch = useDispatch()

    const onClose = ()=>{
        dispatch( setSaving(false) );
        dispatch( clearGastoActiveState() )
        notifyInfo('Operacion Cancelada')
    }

    return (
        <Modal
            opened={isSaving}
            onClose={onClose}
            title={title}
            centered
            overlayColor="#212529"
            overlayOpacity={0.55}
            overlayBlur={3}
        >
            <FormGasto/>
        </Modal>
    );
}

ModalGasto.propTypes = {
    title: PropTypes.string.isRequired
}

export default ModalGasto;
