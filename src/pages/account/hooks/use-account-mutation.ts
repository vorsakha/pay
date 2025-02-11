import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { AccountSchema } from "@/models/account/account.schema";
import { ROUTES } from "@/routes/routes";
import { AccountQueryKeys, AccountService } from "@/services/account.service";

const useAccountMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AccountSchema) => AccountService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AccountQueryKeys.list],
      });

      toast({
        title: "Account created successfully!",
        variant: "default",
      });

      navigate(ROUTES.ACCOUNTS.LIST);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error creating account",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending };
};

export { useAccountMutation };
