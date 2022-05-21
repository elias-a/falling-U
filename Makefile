CXX=g++
CXXFLAGS=-std=c++11

OBJECTS=falling-u
OBJECTS_LINK=u.cpp simulation.cpp

all: $(OBJECTS)

$(OBJECTS): %: %.cpp
	$(CXX) $(CXXFLAGS) -o $@.o $< $(OBJECTS_LINK)

clean:
	rm $(OBJECTS).o