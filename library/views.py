from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from .models import Books, Student, User
from .serializers import *
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password



#Authentication:::::::::::::::::::::::::
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
         serializer = UserSerializer(data = request.data)
         serializer.is_valid(raise_exception=True)
         serializer.save()
         return Response(serializer.data)
    
@api_view(['PUT'])
def modify_user(request,id):
    user = User.objects.get(id = id)
    first_name = request.data['first_name']
    PIN = request.data['PIN']
    email = request.data['email']
    password = request.data['password']
    hashed_password = make_password(password, salt=None, hasher='pbkdf2_sha256')
    data = {'first_name': first_name, 'password': hashed_password, 'PIN': PIN, 'email': email}
    print(request.data)
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    try:
        pin = request.data['PIN']
        password = request.data['password']
        data = User.objects.all()
        filterdata = data.filter(PIN = pin)
        user = filterdata.first()
        checkPassword = user.check_password(password)

        if (checkPassword is not True):
            raise AuthenticationFailed("Password Incorrect")
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        user.last_login = timezone.now()
        user.aToken = access_token
        user.rToken = str(refresh)
        user.save()
        serializer = UserSerializer(user)
        return Response({"message" : "Success", "access_token": access_token, "data" : serializer.data}, status=200)
    except Exception as e:
        return JsonResponse(e)
    

@api_view(['GET'])
def get_user(request, id):
    data = User.objects.get(id=id)
    serializer = UserSerializer(data)
    return Response({"data":serializer.data}, status=200)

@api_view(['GET','POST'])
def book_list(request):
    if request.method == 'GET':
        data = Books.objects.all()
        serializer = DisplayBookSerializer(data, context = {'request': request}, many = True)
        return Response ( {"status":"Success","data" : serializer.data})

    elif request.method == 'POST':
        serializer = DisplayBookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def book_modify(request, Bkid):
    try:
        book = Books.objects.get(BookId=Bkid)
    except Books.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = DisplayBookSerializer(book, context = {'request': request})
        return Response ( {"status":"Success","data" : serializer.data})
    
    elif request.method == 'PUT':
        serializer = DisplayBookSerializer(book, data=request.data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def search_book(request, key):
   
    if request.method == 'GET':
        try:
            books = Books.objects.all()
            book = books.filter(BookName__icontains=key)
            serializer = DisplayBookSerializer(book, context = {'request': request}, many = True)
            return Response ( {"status":"Success","data" : serializer.data})
            
        except Books.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    serializer = DisplayBookSerializer(book, context = {'request': request})
    return Response ( {"status":"Success","data" : serializer.data})  
        
	

@api_view(['GET','POST'])
def student_list(request):
    if request.method == 'GET':
        data = Student.objects.all()
        serializer = StudentSerializer(data, context = {'request': request}, many = True)
        return Response ( {"status":"Success","data" : serializer.data})

    elif request.method == 'POST':
        serializer = StudentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def student_modify(request, PIN):
    try:
        stu = Student.objects.get(PIN=PIN)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentSerializer(stu, context = {'request': request})
        return Response ( {"status":"Success","data" : serializer.data})
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(stu, data=request.data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        stu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)       

	
# class StudentView(generics.CreateAPIView):
#     serializer_class = MyStudentSerializer
#     queryset = Student.objects.all()
#     print(queryset)
@api_view(['GET','POST'])
def rentals(request):
    if request.method == 'GET':
        data = Rents.objects.all()
        serializer = RentalSerializer(data, context = {'request': request}, many = True)
        return Response ( {"status":"Success","data" : serializer.data})

    elif request.method == 'POST':
        serializer = RentalSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def rental_modify(request, id):
    try:
        rent = Rents.objects.get(id=id, Payment='Unpaid')
    except Rents.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RentalSerializer(rent, context = {'request': request})
        return Response ( {"status":"Success","data" : serializer.data})
    
    elif request.method == 'PUT':
        serializer = RentalSerializer(rent, data=request.data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            detailsserializer = RentalSerializer(rent, context = {'request': request})
            return Response ( {"status":"Success","data" : detailsserializer.data})
           
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        rent.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)     


@api_view(['GET'])
def due_list(request, PIN):
   
    if request.method == 'GET':
        try:
            rents = Rents.objects.all()
            rent = rents.filter(PIN=PIN, Payment='Unpaid')
            serializer = RentalSerializer(rent, context = {'request': request}, many = True)
            return Response ( {"status":"Success","data" : serializer.data})
            
        except Books.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    serializer = RentalSerializer(rent, context = {'request': request})
    return Response ( {"status":"Success","data" : serializer.data})  