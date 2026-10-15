'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Town } from '../types';
import { upgradeTownAction } from '../actions';
import { upgradeTownSchema, UpgradeTownType } from '../schema';
import { useDialogContext } from '@/providers/dialog-provider';
import { toaster } from '@/components/ui/toaster';
import CustomForm from '@/components/custom-form';

type Props = {
  town: Town;
};

export default function UpgradeTownForm(props: Props) {
  const t = useTranslations();

  const router = useRouter();

  const { closeDialog } = useDialogContext();

  const form = useForm<UpgradeTownType>({
    resolver: zodResolver(upgradeTownSchema),
    defaultValues: {
      townId: props.town.id,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await upgradeTownAction(data);
    if (res.data) {
      if (res.data.ok) {
        const title = t('toasts.towns.upgrade.success');
        toaster.success({ title });
        router.refresh();
        closeDialog();
      } else {
        const title = res.data.message ?? t('toasts.towns.upgrade.failure');
        toaster.error({ title });
      }
    }
  });

  return (
    <CustomForm disabled={form.formState.isSubmitting} onSubmit={onSubmit} />
  );
}
