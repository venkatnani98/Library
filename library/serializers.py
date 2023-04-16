from rest_framework import serializers
from .models import Books, Student, Rents, User

class UserSerializer(serializers.ModelSerializer):

      class Meta:
            model = User
            fields = '__all__'
            extra_kwargs = {'password' : {'write_only': True}}

      def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)

            if password is not None:
                  instance.set_password(password) 
            instance.save()
            return instance
        

class DisplayBookSerializer(serializers.ModelSerializer):
   
    class Meta:
            model = Books
            fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
      
      class Meta:
            model = Student
            fields = '__all__'


class RentalSerializer(serializers.ModelSerializer):

      class Meta:
            model = Rents
            fields = '__all__'