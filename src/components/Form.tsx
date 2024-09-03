import { useEffect, useRef, useState } from 'react';

type Props = {
  formId: string;
  returnUrl?: string;
  onCompleted?: (data: Record<string, any>) => void;
  onStepChange?: (step: number) => void;
  onLoading?: (loading: boolean) => void;
  onLoaded?: (loaded: boolean) => void;
  values?: Record<string, any>;
  metaData?: Record<string, any>;
};
const Form: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLElement | null>(null);
  const [formInit, setFormInit] = useState(false);

  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    if (!head) return;
    if (document.querySelector('[src="https://sdk.signupnotes.com/form.js"]')) return;
    script.setAttribute('src', 'https://sdk.signupnotes.com/form.js');
    head.appendChild(script);
    script.onload = () => {
      setFormInit(true);
    };
    return () => {
      head.removeChild(script);
    };
  }, []);

  const stepChangeEvent = (e: CustomEvent<number>) => {
    if (props.onStepChange) props.onStepChange(e.detail);
  };

  const submitDataEvent = (e: CustomEvent<Record<string, any>>) => {
    if (props.onCompleted) props.onCompleted(e.detail.formData);
  };

  const loadingEvent = (e: CustomEvent<boolean>) => {
    if (props.onLoading) props.onLoading(e.detail);
  };

  const loadedEvent = (e: CustomEvent<boolean>) => {
    if (props.onLoaded) props.onLoaded(e.detail);
  };

  useEffect(() => {
    if (!formInit) return;
    formRef.current?.addEventListener('step-change', stepChangeEvent as EventListener);
    formRef.current?.addEventListener('submit-data', submitDataEvent as EventListener);
    formRef.current?.addEventListener('loading', loadingEvent as EventListener);
    formRef.current?.addEventListener('loaded', loadedEvent as EventListener);
    return () => {
      formRef.current?.removeEventListener('step-change', stepChangeEvent as EventListener);
      formRef.current?.removeEventListener('submit-data', submitDataEvent as EventListener);
      formRef.current?.removeEventListener('loading', loadingEvent as EventListener);
      formRef.current?.removeEventListener('loaded', loadedEvent as EventListener);
    };
  }, [formInit]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <signup-notes
        ref={formRef}
        form-id={props.formId}
        return-url={props.returnUrl}
        form-values={props.values}
        meta-data={props.metaData}
      />
    </div>
  );
};
export default Form;
