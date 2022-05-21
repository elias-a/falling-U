CXX=g++

OBJECTS=falling-u
OBJECTS_LINK=u.cpp simulation.cpp

all: $(OBJECTS)

$(OBJECTS): %: %.cpp
	$(CXX) -o $@.o $< $(OBJECTS_LINK)

clean:
	rm $(OBJECTS).o