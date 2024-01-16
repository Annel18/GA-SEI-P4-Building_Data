from rest_framework.generics import ListCreateAPIView

class OwnerListCreateView(ListCreateAPIView):

    def perform_create(self, serializer):
        # print('REQUEST USER ->', self.request.user)
        serializer.save(owner=self.request.user)